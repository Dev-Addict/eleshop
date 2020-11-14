import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthInputDto } from './dto/auth-input.dto';
import { AuthResponse } from './interfaces/auth-response.interface';
import { SignUpInputDto } from './dto/sign-up-input.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async singIn(@Body() authInputDto: AuthInputDto): Promise<AuthResponse> {
    const user = await this.authService.validateUser(authInputDto);

    if (!user) throw new UnauthorizedException('0xE00000B');

    return {
      status: 'success',
      token: this.authService.singToken({id: user._id}),
      data: {
        doc: user
      }
    };
  }

  @Post('signup')
  async singUp(@Body() signUpInputDto: SignUpInputDto): Promise<AuthResponse> {
    const user = await this.authService.singUpUser(signUpInputDto);

    return {
      status: 'success',
      token: this.authService.singToken({id: user._id}),
      data: {
        doc: user
      }
    }
  }
}
