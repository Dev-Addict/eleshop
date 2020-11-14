import { FilterQuery } from 'mongoose';

export const convertFilter = <T extends Document>(filter: string): FilterQuery<T> => {
  return JSON.parse(
    JSON.stringify(filter).replace(
      /\b(eq|gt|gte|in|lt|lte|ne|nin|and|not|nor|or|exists|type|expr|jsonSchema|mod|regex|text|where|geoIntersects|geoWithin|near|nearSphere|all|elemMatch|size|bitsAllClear|bitsAllSet|bitsAnySet|meta|slice)\b/g
      , match => `$${match}`)
  );
};
