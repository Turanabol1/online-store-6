import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { UnitOfMeasures } from '../entities/material.entity.js';
import type { UnitOfMeasure } from '../entities/material.entity.js';

export class CreateMaterialDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  readonly title: string;

  @IsNumber()
  @IsPositive()
  readonly price: number;

  @IsEnum(UnitOfMeasures)
  readonly unitOfMeasure: UnitOfMeasure;

  @IsNumber()
  @IsPositive()
  readonly weightPerUnitKg: number;

  @IsBoolean()
  readonly isHeavyCargo: boolean;
}
