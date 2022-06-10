import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class AuthUserDto {
  @ApiProperty({ example: 'example@gmail.com', description: 'email' })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ example: 'superSecretP@SSw0rd', description: 'password' })
  @Length(6, 20)
  @IsString()
  password: string;
}
