import { Transform } from 'class-transformer';
import { IsNotEmpty, Length } from 'class-validator';

export class CartDto {
  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  product_id: number;
  
  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  size: string;
}
