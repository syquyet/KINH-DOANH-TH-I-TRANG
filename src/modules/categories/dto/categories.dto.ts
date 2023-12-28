import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CategoryDto {

  @IsNotEmpty()
  @Length(1,50)
  category_name: string;
  
  @IsNotEmpty()
  @Length(1,200)
  describe: string;
}
