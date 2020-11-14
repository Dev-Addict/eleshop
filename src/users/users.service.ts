import {Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery, CreateQuery } from 'mongoose';

import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
  }

  async findUser(query: FilterQuery<UserDocument>, select: string): Promise<UserDocument> {
    return this.userModel.findOne(query).select(select);
  }

  async findUsers(query: FilterQuery<UserDocument>): Promise<UserDocument[]> {
    return this.userModel.find(query);
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
    return this.userModel.create(<CreateQuery<UserDocument>>createUserDto);
  }
}
