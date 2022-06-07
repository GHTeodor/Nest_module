import { IsBoolean, IsNumber, IsString, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCarDto {
  @IsString()
  model: string;

  @IsString()
  color?: string;

  @IsString()
  country: string;

  @Min(2000)
  @Max(new Date().getFullYear())
  @IsNumber()
  year?: number;

  @IsBoolean()
  isElectrocar: boolean;

  @ApiProperty({
    example: '1',
    description: 'Must be an :id of (any existing) user',
  })
  @IsNumber()
  ownerId: number;
}
