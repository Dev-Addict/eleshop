import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

import { UsersService } from '../users/users.service';
import { UserDocument } from '../users/schemas/user.schema';
import { AuthInputDto } from './dto/auth-input.dto';
import { SignUpInputDto } from './dto/sign-up-input.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser({email, password}: AuthInputDto): Promise<UserDocument | null> {
    if (!/^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(email))
      return null;
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,100}$/.test(password))
      return null;

    const user = await this.usersService.findUser({email}, '+password');

    if (user && await user.correctPassword(password, user.password)) {
      user.password = undefined;
      return user;
    }

    return null;
  }

  async singUpUser(signUpInputDto: SignUpInputDto): Promise<UserDocument> {
    return this.usersService.createUser(signUpInputDto);
  }

  singToken(payload: {
    [key: string]: string
  }): string {
    return sign(payload, process.env.JSON_WEB_TOKEN_SECRET, {
      expiresIn: process.env.JSON_WEB_TOKEN_TIME
    });
  }
}
