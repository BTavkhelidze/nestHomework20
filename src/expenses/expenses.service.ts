import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Expense } from "./schema/expense.schema";
import { User } from "src/users/schema/user.schema";
import path from "path";

@Injectable()
export class ExpensesService {
  constructor(
    @InjectModel("expenses") private ExpensesModel: Model<Expense>,
    @InjectModel("users") private UsersModel: Model<User>,
  ) {}
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

  findAll() {
    return this.ExpensesModel.find().populate({
      path: "user",
      select: "-password -__v -fullName",
    });
  }

  findOne(id) {
    const exp = this.ExpensesModel.findById(id);
    if (!exp) throw new NotFoundException("Expense not found");

    return exp;
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
