import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateQuery, FilterQuery, Model } from 'mongoose';

import { Category, CategoryDocument } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/CreateCategoryDto';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>) {}

  async findCategories(query: FilterQuery<CategoryDocument>, page= 1, limit = 20, sort = '-createdAt'): Promise<CategoryDocument[]> {
    return this.categoryModel.find(query).find(query).skip((page - 1) * limit).limit(limit).sort(sort);
  }

  async getLength(query: FilterQuery<CategoryDocument>): Promise<number> {
    return this.categoryModel.countDocuments(query);
  }

  async createCategory(createCategoryDto: CreateCategoryDto): Promise<CategoryDocument> {
    return this.categoryModel.create(<CreateQuery<CategoryDocument>>createCategoryDto);
  }

  async findCategory(query: FilterQuery<CategoryDocument>): Promise<CategoryDocument> {
    return this.categoryModel.findOne(query);
  }
}
