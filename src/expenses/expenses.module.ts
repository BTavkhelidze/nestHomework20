import { Module } from "@nestjs/common";
import { ExpensesService } from "./expenses.service";
import { ExpensesController } from "./expenses.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { ExpensesSchema } from "./schema/expense.schema";
import { UserSchema } from "src/users/schema/user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "expenses", schema: ExpensesSchema },
      { name: "users", schema: UserSchema },
    ]),
  ],
  controllers: [ExpensesController],
  providers: [ExpensesService],
})
export class ExpensesModule {}
