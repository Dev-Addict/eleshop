import { Controller, Get, Query } from '@nestjs/common';
import { FilterQuery } from "mongoose";

import { CategoriesService } from './categories.service';
import { ParseFilterPipe } from '../pipes/parse-filter.pipe';
import { CategoryDocument } from './schemas/category.schema';
import { DocumentsResponse } from '../interfaces/documents-response.interface';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('')
  async getAll(
    @Query('filter', ParseFilterPipe) filter?: FilterQuery<CategoryDocument>,
    @Query('sort') sort?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<DocumentsResponse<CategoryDocument>> {
    return {
      status: 'success',
      length: await this.categoriesService.getLength(filter),
      data: {
        docs: await this.categoriesService.findCategories(filter, page, limit, sort)
      }
    };
  }
}
