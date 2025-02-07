import { Injectable, NotFoundException, OnModuleInit } from "@nestjs/common";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Expense } from "./schema/expense.schema";
import { User } from "src/users/schema/user.schema";
import { faker } from "@faker-js/faker";
import { QueryParamsDto } from "./dto/query-params.dto";

@Injectable()
export class ExpensesService implements OnModuleInit {
  constructor(
    @InjectModel("expenses") private ExpensesModel: Model<Expense>,
    @InjectModel("users") private UsersModel: Model<User>,
  ) {}

  async onModuleInit() {
    const count = await this.ExpensesModel.countDocuments();

    if (count === 0) {
      const expensesList: {
        category: string;
        price: number;
        title: string;
      }[] = [];
      for (let i = 0; i < 30_000; i++) {
        const expenses = {
          category: faker.commerce.productMaterial(),
          price: faker.number.int({ min: 10, max: 400 }),
          title: faker.commerce.productName(),
        };
        expensesList.push(expenses);
      }
      await this.ExpensesModel.insertMany(expensesList);
      console.log("insert");
    }
  }
  async create(request, createExpenseDto: CreateExpenseDto) {
    const userId = request.userId;
    const existUser = await this.UsersModel.findById(userId);
    if (!existUser) throw new NotFoundException(" user not found  ");

    const newExpense = await this.ExpensesModel.create({
      ...createExpenseDto,
      user: request.userId,
    });
    await this.UsersModel.findByIdAndUpdate(userId, {
      $push: { posts: newExpense._id },
    });
    return "This action adds a new expense";
  }

  findAll({ page, take }: QueryParamsDto) {
    const limit = Math.min(take, 30);
    return this.ExpensesModel.find()
      .populate({
        path: "user",
        select: "-password -__v -fullName",
      })
      .skip((page - 1) * take)
      .limit(limit);
  }

  findOne(id) {
    const exp = this.ExpensesModel.findById(id);
    if (!exp) throw new NotFoundException("Expense not found");

    return exp;
  }

  async deleteAll() {
    return await this.ExpensesModel.deleteMany();
  }

  async update(id, updateExpenseDto: UpdateExpenseDto) {
    const exp = this.ExpensesModel.findById(id);
    if (!exp) throw new NotFoundException("Expense not found");
    const newExp: { category?: string; price?: number; title?: string } = {};
    if (updateExpenseDto.category) newExp.category = updateExpenseDto.category;
    if (updateExpenseDto.price) newExp.price = updateExpenseDto.price;
    if (updateExpenseDto.title) newExp.title = updateExpenseDto.title;

    await this.ExpensesModel.findByIdAndUpdate(id, newExp, { new: true });
    return `This action updates a #${id} expense`;
  }

  async remove(id) {
    const exp = this.ExpensesModel.findById(id);
    if (!exp) throw new NotFoundException("Expense not found");

    return await this.ExpensesModel.findByIdAndDelete(id);
  }
}
