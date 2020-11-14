import { Document } from 'mongoose';

import { Response } from './response.interface';

export interface DocumentsResponse<T extends Document> extends Response {
  data: {
    docs: T[]
  }
}
