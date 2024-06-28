import { IsString, Length } from 'class-validator';

export class LoginUsersDto {
  @IsString()
  @Length(3, 10)
  email: string;
  @IsString()
  @Length(5, 10)
  password: string;
}
