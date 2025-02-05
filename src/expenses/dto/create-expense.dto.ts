import { IsNumber, IsString } from "class-validator";

export class CreateExpenseDto {
  @IsString()
  category: string;

  @IsNumber()
  price: number;

  @IsString()
  title: string;
}
