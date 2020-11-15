import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop({
    type: Types.ObjectId,
    ref: Category.name
  })
  parentCategory?: Types.ObjectId;

  @Prop({
    required: [true, '0xE00000C']
  })
  title: string;

  @Prop({
    default: 'default.jpg'
  })
  icon: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
