import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class UpdateCarDto {
  @IsString()
  color?: string;

  @IsString()
  country: string;

  @Min(2000)
  @Max(new Date().getFullYear())
  @IsNumber()
  @IsOptional()
  year?: number;

  @IsBoolean()
  @IsOptional()
  isElectrocar: boolean;

  @IsString()
  @IsOptional()
  avatar: string;
}
