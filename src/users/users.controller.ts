import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { FilterQuery } from 'mongoose';

import { UsersService } from './users.service';
import { ParseFilterPipe } from '../pipes/parse-filter.pipe';
import { Roles } from '../auth/decorators/roles.decorator';
import { ProtectGuard } from '../auth/guards/protect.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDocument } from './schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('')
  async getAll(
    @Query('filter', ParseFilterPipe) filter?: FilterQuery<UserDocument>,
    @Query('sort') sort?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number
  ) {
    return this.usersService.findUsers(filter, page, limit, sort);
  }

  @Post('')
  @Roles('admin')
  @UseGuards(ProtectGuard, RolesGuard)
  async createOne(
    @Body() createUserDto: CreateUserDto
  ) {
    return this.usersService.createUser(createUserDto);
  }

  @Get('/:id')
  async getOne(
    @Param('id') id: string
  ) {
    return this.usersService.findUser({_id: id});
  }
}
