import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { FilterQuery } from "mongoose";

import { CategoriesService } from './categories.service';
import { ParseFilterPipe } from '../pipes/parse-filter.pipe';
import { ProtectGuard } from '../auth/guards/protect.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateCategoryDto } from './dto/CreateCategoryDto';
import { CategoryDocument } from './schemas/category.schema';
import { DocumentsResponse } from '../interfaces/documents-response.interface';
import { DocumentResponse } from '../interfaces/document-response.interface';

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

  @Post('')
  @Roles('admin')
  @UseGuards(ProtectGuard, RolesGuard)
  async createOne(
    @Body() createCategoryDto: CreateCategoryDto
  ): Promise<DocumentResponse<CategoryDocument>> {
    return {
      status: 'success',
      data: {
        doc: await this.categoriesService.createCategory(createCategoryDto)
      }
    };
  }
}
