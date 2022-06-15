import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @Length(2, 10)
  name: string;

  @IsOptional()
  @IsNumber()
  age: number;

  @IsString()
  city: string;

  @IsString()
  @IsOptional()
  avatar: string;
}
