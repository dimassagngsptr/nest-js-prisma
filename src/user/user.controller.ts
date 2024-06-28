import { Controller, Get, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const results = await this.userService.findAll();
      return response.status(200).json({
        status: 'OK',
        message: 'Success fetch data all users',
        results: results,
      });
    } catch (error) {
      return response.status(500).json({
        status: 'Error',
        message: 'Internal Server Error',
      });
    }
  }
}
