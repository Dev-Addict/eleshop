import { Controller, Get, Query } from '@nestjs/common';
import { FilterQuery } from 'mongoose';

import { UsersService } from './users.service';
import { ParseFilterPipe } from '../pipes/parse-filter.pipe';
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

}
