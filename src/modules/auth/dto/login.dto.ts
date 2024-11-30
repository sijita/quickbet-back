import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { passwordRegEx } from 'src/common/utils/constants';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `Password must contain Minimum 8 characters, 
      at least one uppercase letter, 
      one lowercase letter and 
      one number`,
  })
  password: string;
}
