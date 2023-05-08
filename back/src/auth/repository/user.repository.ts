import { Repository, DataSource } from 'typeorm';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { SignUpCredentialsDto } from '../dto/signup-credentials.dto';
import { SignInCredentialsDto } from '../dto/signin-credentials.dto';
import { User } from '../entity/user.entity';
import { UserInfo } from '../../user/entity/user-info.entity';
import { JwtPayload } from '../interface/jwt-payload.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async signUp(signupCredentialsDto: SignUpCredentialsDto) {
    const { username, password } = signupCredentialsDto;

    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      const userInfo = new UserInfo();
      userInfo.email = signupCredentialsDto.email;
      userInfo.fullName = signupCredentialsDto.fullName;
      userInfo.gender = signupCredentialsDto.gender;
      await userInfo.save();

      user.userInfo = userInfo;
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(
    signinCredentialDto: SignInCredentialsDto,
  ): Promise<JwtPayload> {
    const { username, password } = signinCredentialDto;
    const auth = await this.getUserInfoByUsername(username);

    if (auth && (await auth.validatePassword(password, auth.password))) {
      return {
        id: auth.id,
        username: auth.username,
        userInfo: auth.userInfo,
      };
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async getUserInfoByUsername(username: string) {
    const auth = await this.findOne({ where: { username } });
    if (auth) {
      return auth;
    } else {
      return null;
    }
  }
}
