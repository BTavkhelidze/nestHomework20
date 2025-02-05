import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class User {
  @Prop({ type: String })
  fullName: string;

  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "expenses" })
  expenses: [mongoose.Schema.Types.ObjectId];
}

export const UserSchema = SchemaFactory.createForClass(User);
