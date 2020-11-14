import {Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery, CreateQuery } from 'mongoose';

import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user-dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findUser(query: FilterQuery<UserDocument>, select?: string): Promise<UserDocument> {
    return this.userModel.findOne(query).select(select);
  }

  async findUsers(query: FilterQuery<UserDocument>, page= 1, limit = 20, sort = '-createdAt'): Promise<UserDocument[]> {
    return this.userModel.find(query).skip((page - 1) * limit).limit(limit).sort(sort);
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
    return this.userModel.create(<CreateQuery<UserDocument>>createUserDto);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserDocument> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto);
  }
}
