import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignupDto {
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  readonly name: string;

  @IsString({ message: 'O email deve ser uma string' })
  @IsNotEmpty({ message: 'O email não pode ser vazio' })
  @IsEmail({}, { message: 'O email deve ser um email válido' })
  readonly email: string;

  @IsString()
  @IsNotEmpty({ message: 'A senha não pode ser vazia' })
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
  readonly password: string;
}
