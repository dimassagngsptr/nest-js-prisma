import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { LoginUsersDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/register.dto';
import { User } from 'src/user/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(loginUserDto: LoginUsersDto): Promise<any> {
    const { email, password } = loginUserDto;

    const results = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    if (!results) {
      throw new NotFoundException('User not found');
    }
    const validatePass = await bcrypt.compare(password, results?.password);
    if (!validatePass) {
      throw new NotFoundException('Invalid password');
    }
    return {
      data: results,
      token: this.jwtService.sign({
        sub: results?.id,
        fullname: results?.fullname,
      }),
    };
  }

  async register(registerUserDto: RegisterUserDto): Promise<any> {
    const createUser = new User();
    createUser.fullname = registerUserDto.fullname;
    createUser.email = registerUserDto.email;
    createUser.password = await bcrypt.hash(registerUserDto.password, 10);
    const user = await this.userService.create(createUser);

    return {
      token: this.jwtService.sign({ fullname: user?.fullname }),
    };
  }
}
