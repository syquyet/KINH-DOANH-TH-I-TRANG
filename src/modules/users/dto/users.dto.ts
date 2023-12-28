import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsPhoneNumber, Length } from 'class-validator';

export class UserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(1, 45, {
    message: 'User name must not be empty and should not exceed 45 characters',
  })
  user_name: string;

  @IsNotEmpty()
  @IsPhoneNumber('VN', { message: 'Invalid phone number' })
  phone: string;

  @IsNotEmpty()
  avatar: string;

  @IsNotEmpty()
  @Length(1, 200, {
    message: 'Address must not be empty and should not exceed 200 characters',
  })
  address: string;

  @IsNotEmpty()
  @Length(8, 20, { message: 'Password must be between 8 and 20 characters' })
  password: string;
}
