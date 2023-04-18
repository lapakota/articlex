import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInCredentialsDto } from '../dto/signin-credentials.dto';
import { SignupCredentialsDto } from '../dto/signup-credentials.dto';
import { User } from '../entity/user.entity';
import { JwtPayload } from '../interface/jwt-payload.interface';
import { UserRepository } from '../repository/user.repository';
import * as argon2 from 'argon2';
import * as config from 'config';

const dbConfig = config.get('jwt');

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(signupCredentialsDto: SignupCredentialsDto): Promise<void> {
    return this.userRepository.signUp(signupCredentialsDto);
  }

  async signIn(
    signInCredentialsDto: SignInCredentialsDto,
  ): Promise<{ accessToken: string; refreshToken: string; user: JwtPayload }> {
    const resp = await this.userRepository.validateUserPassword(
      signInCredentialsDto,
    );
    if (!resp) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.getAccessToken(resp);
    const refreshToken = this.getRefreshToken(resp);

    await this.updateRefreshTokenInUser(refreshToken, resp.username);

    return {
      accessToken,
      refreshToken,
      user: resp,
    };
  }

  async signOut(user: User) {
    await this.updateRefreshTokenInUser(null, user.username);
  }

  async getNewAccessAndRefreshToken(payload: JwtPayload) {
    const refreshToken = this.getRefreshToken(payload);
    await this.updateRefreshTokenInUser(refreshToken, payload.username);

    const accessToken = this.getAccessToken(payload);

    return {
      accessToken,
      refreshToken,
    };
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, username: string) {
    const user = await this.userRepository.getUserInfoByUsername(username);

    const isRefreshTokenMatching = await argon2.verify(
      user.hashedRefreshToken || '',
      refreshToken,
    );

    if (isRefreshTokenMatching) {
      await this.updateRefreshTokenInUser(null, username);
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }

  private async updateRefreshTokenInUser(
    refreshToken: string,
    username: string,
  ) {
    if (refreshToken) {
      refreshToken = await argon2.hash(refreshToken);
    }

    await this.userRepository.update(
      { username: username },
      {
        hashedRefreshToken: refreshToken,
      },
    );
  }

  private getAccessToken(payload: JwtPayload) {
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET || dbConfig.secret,
      expiresIn:
        +process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME || dbConfig.expiresIn,
    });
    return accessToken;
  }

  private getRefreshToken(payload: JwtPayload) {
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET || dbConfig.refreshSecret,
      expiresIn:
        +process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME ||
        dbConfig.refreshExpiresIn,
    });
    return refreshToken;
  }
}
