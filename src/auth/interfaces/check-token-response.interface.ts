import { Response } from '../../interfaces/response.interface';
import { UserDocument } from '../../users/schemas/user.schema';

export interface CheckTokenResponse extends Response{
  data: {
    doc: UserDocument;
  };
}
