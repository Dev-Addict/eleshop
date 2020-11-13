import { Rote } from '../schemas/user.schema';

export interface User {
  firstname: string;
  lastname: string;
  phoneNumber?: string;
  isPhoneNumberValidated: boolean;
  email: string;
  isEmailVerified: boolean;
  password?: string;
  rote: Rote;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetTokenExpires?: Date;
  verifyEmailToken?: string;
  verifyEmailExpires?: Date
}
