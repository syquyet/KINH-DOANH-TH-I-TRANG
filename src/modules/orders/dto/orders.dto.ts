import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsPhoneNumber, Length } from 'class-validator';

export class OrderDto {
  @IsNotEmpty()
  user_id: number;


  @IsNotEmpty()
  total: number;

  @IsNotEmpty()
  @Length(1, 10)
  status: string;

  @IsNotEmpty()
  @Length(1, 45)
  user_name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber('VN', { message: 'Invalid phone number' })
  phone: string;

  @IsNotEmpty()
  @Length(1, 200)
  note: string;

  @IsNotEmpty()
  @Length(1, 200)
  delivery_address: string;
}
