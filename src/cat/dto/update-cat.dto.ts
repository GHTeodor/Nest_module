import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';

export class UpdateCatDto {
  @Length(2, 10)
  @IsString()
  name: string;

  @IsString()
  color: string;

  @IsBoolean()
  @IsOptional()
  petPassport: boolean;

  @IsString()
  @IsOptional()
  avatar: string;
}
