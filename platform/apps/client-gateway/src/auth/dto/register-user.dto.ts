import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  name!: string;

  @IsEmail()
  @IsString()
  email!: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password!: string;
}
