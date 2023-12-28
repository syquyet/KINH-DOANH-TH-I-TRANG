import { File } from 'buffer';
import { Transform } from 'class-transformer';
import { IsNotEmpty, Length, Max, Min } from 'class-validator';

export class ProductDto {
  @IsNotEmpty()
  @Length(1, 50)
  product_name: string;

  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @Min(1000)
  @Max(100000000)
  product_price: number;

  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @Min(0)
  @Max(1000)
  quantity: number;

  @IsNotEmpty()
  @Length(1, 50)
  category_name: string;

  product_img: string;

  @IsNotEmpty()
  @Length(1, 20)
  size: string;

  @IsNotEmpty()
  @Length(0, 200)
  describe: string;
}
