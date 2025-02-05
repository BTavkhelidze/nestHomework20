import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class Expense {
  @Prop({ type: String })
  category: string;

  @Prop({ type: Number })
  price: number;

  @Prop({ type: String })
  title: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "users" })
  user: mongoose.Schema.Types.ObjectId;
}

export const ExpensesSchema = SchemaFactory.createForClass(Expense);
