import { UsersService } from './users/services/users.service';
import { Controller, Get, Request, Post, UseGuards, HttpStatus } from '@nestjs/common';
import { LocalAuthGuard, AuthService, BasicAuthGuard } from './auth';

@Controller()
export class AppController {

  constructor(private authService: AuthService, private usersService: UsersService) {}

  @Get(['', 'ping'])
  healthCheck(): any {
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
    };
  }

  //! Requires payload: {"username": "john", "password": "pass_example"}
  @UseGuards(LocalAuthGuard)
  @Post('api/auth/login')
  async login(@Request() req: any) {
    const token = this.authService.login(req.user, 'basic');

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {
        ...token,
      },
    };
  }

  @UseGuards(BasicAuthGuard)
  @Get('api/profile')
  async getProfile(@Request() req: any) {
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {
        user: req.user,
      },
    };
  }

  @Get('users')
  async getUsers() {
    return this.usersService.getUsers();
  }
}
