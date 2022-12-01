import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { appDataSource } from './data-source';
import User from './db/models/user.entity';
import { UsersService } from './users/users.service';

async function getAll() {
  const user = await appDataSource
    .getRepository(User)
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.records', 'records')
    .where('user.id = :id', { id: 1 })
    .getMany();

  return user;
}

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  // @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    const { email, password } = req.body;
    const user = await this.authService.validate(email, password);
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('users')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('/')
  getAll(@Request() req) {
    return getAll();
  }
}
