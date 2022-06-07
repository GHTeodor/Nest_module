import { IsNumber, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @Length(2, 10)
  name: string;

  @IsNumber()
  age: number;

  @IsString()
  city: string;
}
