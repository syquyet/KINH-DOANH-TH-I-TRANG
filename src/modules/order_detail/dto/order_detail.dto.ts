import { Transform } from 'class-transformer';
import { IsNotEmpty, Length } from 'class-validator';

export class OrderDetailDto {
  @IsNotEmpty()
  product_id: number;

  @IsNotEmpty()
  quantity: number;

  
  @IsNotEmpty()
  size: string;
  
  @IsNotEmpty()
  order_id: number;
  

  
}