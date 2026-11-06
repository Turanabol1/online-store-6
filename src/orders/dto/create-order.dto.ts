import { IsEmail, IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  readonly productId: string;

  @IsInt()
  @IsPositive()
  readonly quantity: number;

  @IsEmail()
  readonly customerEmail: string;
}
