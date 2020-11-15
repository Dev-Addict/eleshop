import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { FilterQuery } from 'mongoose';

import { UsersService } from './users.service';
import { ParseFilterPipe } from '../pipes/parse-filter.pipe';
import { Roles } from '../auth/decorators/roles.decorator';
import { ProtectGuard } from '../auth/guards/protect.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { UserDocument } from './schemas/user.schema';
import { DocumentsResponse } from '../interfaces/documents-response.interface';
import { DocumentResponse } from '../interfaces/document-response.interface';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('')
  async getAll(
    @Query('filter', ParseFilterPipe) filter?: FilterQuery<UserDocument>,
    @Query('sort') sort?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number
  ): Promise<DocumentsResponse<UserDocument>> {
    return {
      status: 'success',
      length: await this.usersService.getLength(filter),
      data: {
        docs: await this.usersService.findUsers(filter, page, limit, sort)
      }
    };
  }

  @Post('')
  @Roles('admin')
  @UseGuards(ProtectGuard, RolesGuard)
  async createOne(
    @Body() createUserDto: CreateUserDto
  ): Promise<DocumentResponse<UserDocument>> {
    return {
      status: 'success',
      data: {
        doc: await this.usersService.createUser(createUserDto)
      }
    };
  }

  @Get(':id')
  async getOne(
    @Param('id') id: string
  ): Promise<DocumentResponse<UserDocument>> {
    return {
      status: 'success',
      data: {
        doc: await this.usersService.findUser({_id: id})
      }
    };
  }

  @Patch(':id')
  @Roles('admin', 'selfUser')
  @UseGuards(ProtectGuard, RolesGuard)
  async updateOne(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<DocumentResponse<UserDocument>> {
    return {
      status: 'success',
      data: {
        doc: await this.usersService.updateUser(id, updateUserDto)
      }
    };
  }

  @Delete(':id')
  @Roles('admin', 'selfUser')
  @UseGuards(ProtectGuard, RolesGuard)
  async deleteOne(
    @Param('id') id: string,
  ): Promise<DocumentResponse<UserDocument>> {
    return {
      status: 'success',
      data: {
        doc: await this.usersService.deleteUser(id)
      }
    };
  }
}
