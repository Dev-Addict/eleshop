import { Rote } from '../schemas/user.schema';

export class CreateUserDto {
  firstname: string;
  lastname: string;
  phoneNumber?: string;
  isPhoneNumberValidated?: boolean;
  email: string;
  isEmailVerified?: boolean;
  password: string;
  rote?: Rote;
}
