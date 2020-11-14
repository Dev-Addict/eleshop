import { UserDocument } from '../../users/schemas/user.schema';
import { Response } from '../../interfaces/response.interface';

export interface AuthResponse extends Response {
  token: string;
  data: {
    doc: UserDocument;
  };
}
