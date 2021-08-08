import { IsNotEmpty } from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  displayName: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class SigninDto {
  @IsNotEmpty()
  identifier: string;

  @IsNotEmpty()
  password: string;
}
