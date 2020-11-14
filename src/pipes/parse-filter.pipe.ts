import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { FilterQuery } from 'mongoose';

import { convertFilter } from '../utils/convert-filter.util';

@Injectable()
export class ParseFilterPipe<T extends Document> implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): FilterQuery<T> {
    if (value)
      return convertFilter<T>(<string>value);
    return {};
  }
}
