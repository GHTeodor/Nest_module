import { IsBoolean, IsString, Length } from 'class-validator';

export class UpdateCatDto {
  @Length(2, 10)
  @IsString()
  name: string;

  @IsString()
  color: string;

  @IsBoolean()
  petPassport: boolean;
}
