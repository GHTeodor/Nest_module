import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCatDto {
  @Length(2, 10)
  @IsString()
  name: string;

  @IsString()
  color?: string;

  @Min(0)
  @Max(20)
  @IsNumber()
  age: number;

  @IsBoolean()
  petPassport: boolean;

  @ApiProperty({
    example: '1',
    description: 'Must be an :id of (any existing) user',
  })
  @IsNotEmpty()
  @IsNumber()
  ownerId: number;
}
