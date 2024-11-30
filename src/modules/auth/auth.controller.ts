import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() { name, username, email, password }: CreateUserDto) {
    return await this.authService.register({ name, username, email, password });
  }

  @Post('login')
  async login(@Body() { email, password }: LoginDto) {
    return await this.authService.login({ email, password });
  }
}
