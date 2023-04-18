import {
  Post,
  Body,
  ValidationPipe,
  Controller,
  UseGuards,
  Get,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthenticationGuard } from 'src/auth/guards/jwt-authentication.guard';
import { JwtRefreshTokenGuard } from 'src/auth/guards/jwt-refresh-token.guard';
import { GetUser } from './decorator/get-user.decorator';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { SignInCredentialsDto } from './dto/signin-credentials.dto';
import { SignupCredentialsDto } from './dto/signup-credentials.dto';
import { User } from './entity/user.entity';
import { JwtPayload } from './interface/jwt-payload.interface';
import { AuthService } from './service/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) signupCredentialsDto: SignupCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(signupCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) signinCredentialsDto: SignInCredentialsDto,
  ): Promise<{ accessToken: string; refreshToken: string; user: JwtPayload }> {
    return this.authService.signIn(signinCredentialsDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthenticationGuard)
  @Get('/logout')
  logout(@GetUser() user: User) {
    this.authService.signOut(user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtRefreshTokenGuard)
  @Post('/refresh-tokens')
  async refreshTokens(@GetUser() user: User, @Body() token: RefreshTokenDto) {
    const user_info = await this.authService.getUserIfRefreshTokenMatches(
      token.refresh_token,
      user.username,
    );

    if (user_info) {
      const userInfo = {
        username: user_info.username,
        user_info: user_info.user_info,
      };

      return this.authService.getNewAccessAndRefreshToken(userInfo);
    } else {
      return null;
    }
  }
}
