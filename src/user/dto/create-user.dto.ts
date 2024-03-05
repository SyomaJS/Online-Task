import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @MinLength(5, { message: 'Login must be at least 5 characters' })
  @IsString()
  @IsNotEmpty()
  login: string;

  @MinLength(5, { message: 'Password must be at least 5 characters' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SignInUserDto extends CreateUserDto {}
