import { IsBoolean, IsNumber, IsString, Max, Min } from 'class-validator';

export class UpdateCarDto {
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
}
