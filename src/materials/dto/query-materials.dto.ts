import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class QueryMaterialsDto {
  @IsOptional()
  @IsString()
  readonly search?: string;

  // з рядка "5" у query робимо число 5
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly limit?: number;
}
