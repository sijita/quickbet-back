import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register({ name, username, email, password }: CreateUserDto) {
    try {
      const user = await this.usersService.findUserByEmail(email);

      if (user) {
        throw new BadRequestException('The user already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await this.usersService.createUser({
        name,
        username,
        email,
        password: hashedPassword,
      });

      return {
        message: 'User created successfully',
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Error creating user. Please try again later',
      );
    }
  }

  async login({ email, password }: LoginDto) {
    try {
      const user = await this.usersService.findUserByEmail(email);

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = { sub: user.id, email: user.email };

      const token = await this.jwtService.signAsync(payload);

      return {
        token: token,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Error logging in. Please try again later',
      );
    }
  }
}
