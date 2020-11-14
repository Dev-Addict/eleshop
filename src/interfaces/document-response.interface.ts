import { Document } from 'mongoose';

import { Response } from './response.interface';

export interface DocumentResponse<T extends Document> extends Response {
  data: {
    doc:T;
  };
}
