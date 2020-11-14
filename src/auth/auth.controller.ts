import { Body, Controller, Post, UnauthorizedException, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthInputDto } from './dto/auth-input.dto';
import { AuthResponse } from './interfaces/auth-response.interface';
import { SignUpInputDto } from './dto/sign-up-input.dto';
import { CheckTokenResponse } from './interfaces/check-token-response.interface';
import { ProtectGuard } from './guards/protect.guard';
import { ProtectedUser } from './decorators/protected-user.decorator';
import { UserDocument } from '../users/schemas/user.schema';

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

  @Post('checktoken')
  @UseGuards(ProtectGuard)
  async checkToken(@ProtectedUser() user: UserDocument): Promise<CheckTokenResponse> {
    return {
      status: 'success',
      data: {
        doc: user
      }
    }
  }
}
