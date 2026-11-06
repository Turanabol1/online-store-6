import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { UnitOfMeasures } from '../entities/material.entity.js';
import type { UnitOfMeasure } from '../entities/material.entity.js';

// Ті самі правила, що й у CreateMaterialDto, але кожне поле необов'язкове
export class UpdateMaterialDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  readonly title?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly price?: number;

  @IsOptional()
  @IsEnum(UnitOfMeasures)
  readonly unitOfMeasure?: UnitOfMeasure;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly weightPerUnitKg?: number;

  @IsOptional()
  @IsBoolean()
  readonly isHeavyCargo?: boolean;
}
