import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @Length(2, 10)
  name: string;

  @ApiProperty({ example: 'user@gmail.com', description: 'email (unique)' })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  age: number;

  @IsString()
  @IsOptional()
  avatar: string;

  @IsString()
  city: string;

  @IsString()
  @Length(6, 20)
  readonly password: string;

  @IsBoolean()
  status: boolean;
}
