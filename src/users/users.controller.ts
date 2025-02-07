import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { HasPermissionForDeleteAllUsers } from "./guards/hasPermissionForDelete";
import { QueryDto } from "./dto/query.dto";

import { getAgeDto } from "./dto/getAge-query.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Delete("delete-all")
  @UseGuards(HasPermissionForDeleteAllUsers)
  deleteAll() {
    return this.usersService.deleteAll();
  }

  // @ApiAcceptedResponse()
  @Get()
  findAll(@Query() query: QueryDto) {
    return this.usersService.findAll(query);
  }

  @Get("count-all")
  countAllUsers() {
    return this.usersService.countAllUsers();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(id);
  }

  @Get("age")
  getAge(@Query() query: getAgeDto) {
    console.log(query);
    // return this.usersService.getAge(query);
  }
  @Get("what")
  getWjat() {
    return console.log("was");
  }
}
