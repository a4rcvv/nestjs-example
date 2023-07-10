import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInDto {
  @ApiProperty({ type: String })
  @IsEmail()
  email: string;
  @ApiProperty({ type: String })
  @IsNotEmpty()
  password: string;
}

export class SignUpDto {
  @ApiProperty({ type: String })
  @IsEmail()
  email: string;
  @ApiProperty({ type: String })
  @IsNotEmpty()
  password: string;
  @ApiProperty({ type: String })
  @IsNotEmpty()
  username: string;
}
