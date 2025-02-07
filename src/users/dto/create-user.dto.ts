import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

@Injectable()
export class CreateUserDto {
  @ApiProperty({
    example: "jon wiky",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({
    example: "levan@gmail.com",
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsNumber()
  age: number;

  @ApiProperty({
    example: "jon1234",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
