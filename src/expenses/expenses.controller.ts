import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from "@nestjs/common";
import { ExpensesService } from "./expenses.service";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";
import { HasUserId } from "./guards/hasUserId.guard";

@Controller("expenses")
@UseGuards(HasUserId)
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  create(@Req() request, @Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.create(request, createExpenseDto);
  }

  @Get()
  findAll() {
    return this.expensesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.expensesService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expensesService.update(id, updateExpenseDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.expensesService.remove(id);
  }
}
