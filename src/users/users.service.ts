import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./schema/user.schema";

@Injectable()
export class UsersService {
  constructor(@InjectModel("users") private usersModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.usersModel.find({
      email: createUserDto.email,
    });

    if (existingUser) throw new BadRequestException("User already exists");

    const user = await this.usersModel.create(createUserDto);

    return `user created successfully ${user}`;
  }

  findAll() {
    return this.usersModel.find();
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
}
