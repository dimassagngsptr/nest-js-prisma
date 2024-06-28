import {  IsString, Length } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  fullname: string;

  @IsString()
  @Length(3, 10)
  email: string;

  @IsString()
  @Length(5, 10)
  password: string;
}
