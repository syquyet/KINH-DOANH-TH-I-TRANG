import { IsEmail, IsNotEmpty, IsPhoneNumber, Length } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @Length(1, 45)
  user_name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber('VN', { message: 'Invalid phone number' })
  phone: string;

  @IsNotEmpty()
  @Length(1, 500, { message: 'Address must not be empty and should not exceed 500 characters' })
  address: string;
  
  @IsNotEmpty()
  @Length(8, 20)
  password: string;
  
}
