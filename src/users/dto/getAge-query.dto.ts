import { Injectable } from "@nestjs/common";
import { Transform } from "class-transformer";
import { IsNumber } from "class-validator";

@Injectable()
export class getAgeDto {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  age: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  ageFrom: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  ageTo: number;
}
