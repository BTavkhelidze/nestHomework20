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
  Query,
} from "@nestjs/common";
import { ExpensesService } from "./expenses.service";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";
import { HasUserId } from "./guards/hasUserId.guard";
import { HasPermissionForDeleteAll } from "./guards/hasPermissionforDelete.guard";
import { QueryParamsDto } from "./dto/query-params.dto";

@Controller("expenses")
@UseGuards(HasUserId)
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  create(@Req() request, @Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.create(request, createExpenseDto);
  }

  @Delete("delete-all")
  @UseGuards(HasPermissionForDeleteAll)
  deleteAll() {
    return this.expensesService.deleteAll();
  }

  @Get()
  findAll(@Query() query: QueryParamsDto) {
    return this.expensesService.findAll(query);
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
