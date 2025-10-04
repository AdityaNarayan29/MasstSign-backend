import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    return this.auth.register(dto.email, dto.password, dto.role as any);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.auth.login(dto.email, dto.password);
  }
}

