import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./schema/user.schema";
import { faker } from "@faker-js/faker";
import { QueryDto } from "./dto/query.dto";

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(@InjectModel("users") private usersModel: Model<User>) {}

  async onModuleInit() {
    const count = await this.usersModel.countDocuments();
    console.log(count);
    if (count === 0) {
      const usersList: {
        fullName: string;
        email: string;
        password: string;
        age: number;
      }[] = [];
      for (let i = 0; i < 30_000; i++) {
        const user = {
          fullName: faker.person.fullName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          age: faker.number.int({ min: 21, max: 90 }),
        };
        usersList.push(user);
      }
      await this.usersModel.insertMany(usersList);

      console.log("UsersService initialized ");
    }
  }

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.usersModel.find({
      email: createUserDto.email,
    });

    if (existingUser) throw new BadRequestException("User already exists");

    const user = await this.usersModel.create(createUserDto);

    return `user created successfully ${user}`;
  }

  findAll({ page, take }: QueryDto) {
    const limit = Math.min(take, 30);
    return this.usersModel
      .find()
      .skip((page - 1) * take)
      .limit(limit);
  }

  countAllUsers() {
    return this.usersModel.countDocuments();
  }

  async deleteAll() {
    return await this.usersModel.deleteMany();
  }

  async findOne(id) {
    const user = await this.usersModel.findById(id);
    if (!user) throw new NotFoundException("User not found");
    return user;
  }

  async update(id, updateUserDto: UpdateUserDto) {
    const user = await this.usersModel.findById(id);
    if (!user) throw new NotFoundException("User not found");
    const { email, fullName, password } = updateUserDto;
    const newUser: { email?: string; fullName?: string; password?: string } =
      {};

    if (email) newUser.email = email;
    if (fullName) newUser.fullName = fullName;
    if (password) newUser.password = password;

    return await this.usersModel.findByIdAndUpdate(id, newUser, { new: true });
  }

  async remove(id) {
    const user = await this.usersModel.findById(id);
    if (!user) throw new NotFoundException("User not found");

    await this.usersModel.findByIdAndDelete(id);
    return `This action removes a user`;
  }

  async getAge(query) {
    const { getAge, ageFrom, ageTo } = query;
    const users = await this.usersModel.find({ age: { $eq: 20 } });
    console.log("getAge");
    // return users;
  }
}
