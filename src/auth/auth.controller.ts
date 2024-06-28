import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoginUsersDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(
    @Req() request: Request,
    @Res() response: Response,
    @Body() loginUsersDto: LoginUsersDto,
  ): Promise<any> {
    try {
      const results = await this.authService.login(loginUsersDto);
      response.status(200).json({
        status: 'OK',
        message: 'Login successful',
        results: results,
      });
    } catch (error) {
      response.status(500).json({
        status: 'Error',
        message: error.message,
      });
    }
  }

  @Post('/register')
  async register(
    @Req() request: Request,
    @Res() response: Response,
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<any> {
    try {
      const results = await this.authService.register(registerUserDto);
      response.status(200).json({
        status: 'OK',
        message: 'Register successfully',
        results: results,
      });
    } catch (error) {
      response.status(500).json({
        status: 'Error',
        message: error.message,
      });
    }
  }
}
