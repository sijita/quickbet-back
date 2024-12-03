import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { passwordRegEx } from 'src/common/utils/constants';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `Password must contain Minimum 8 and maximum 20 characters, at least one uppercase letter, one lowercase letter, one number and one special character`,
  })
  password: string;
}
