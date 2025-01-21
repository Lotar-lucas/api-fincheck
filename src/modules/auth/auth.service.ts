import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { SigninDto } from './dto/signinDto.dto';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signupDto.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signin(signinDto: SigninDto) {
    const { email, password } = signinDto;

    const user = await this.usersRepo.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Usuário não autorizado');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Senha inválida');
    }

    const accessToken = await this.genarateAccessToken(user.id);

    return { accessToken };
  }

  async signup(signupDto: SignupDto) {
    const { email, password, name } = signupDto;

    const emailTaken = await this.usersRepo.findUnique({ where: { email } });

    if (emailTaken) {
      throw new ConflictException('Email already in use ');
    }

    const hashedPassword = await hash(password, 12);

    const user = await this.usersRepo.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Todo: CRUD for categories
    await this.usersRepo.bulkCreateCategories({
      data: [
        {
          id: uuidv4(),
          name: 'Salário',
          icon: 'travel',
          type: 'INCOME',
          userId: user.id,
        },
        // Income
        {
          id: uuidv4(),
          name: 'Salário',
          icon: 'travel',
          type: 'INCOME',
          userId: user.id,
        },
        {
          id: uuidv4(),
          name: 'Outro',
          icon: 'other',
          type: 'INCOME',
          userId: user.id,
        },
        // Expense
        {
          id: uuidv4(),
          name: 'Casa',
          icon: 'home',
          type: 'EXPENSE',
          userId: user.id,
        },
        {
          id: uuidv4(),
          name: 'Alimentação',
          icon: 'food',
          type: 'EXPENSE',
          userId: user.id,
        },
        {
          id: uuidv4(),
          name: 'Lazer',
          icon: 'fun',
          type: 'EXPENSE',
          userId: user.id,
        },
        {
          id: uuidv4(),
          name: 'Mercado',
          icon: 'grocery',
          type: 'EXPENSE',
          userId: user.id,
        },
        {
          id: uuidv4(),
          name: 'Roupas',
          icon: 'clothes',
          type: 'EXPENSE',
          userId: user.id,
        },
        {
          id: uuidv4(),
          name: 'Transporte',
          icon: 'transport',
          type: 'EXPENSE',
          userId: user.id,
        },
        {
          id: uuidv4(),
          name: 'Viagem',
          icon: 'travel',
          type: 'EXPENSE',
          userId: user.id,
        },
        {
          id: uuidv4(),
          name: 'Outro',
          icon: 'other',
          type: 'EXPENSE',
          userId: user.id,
        },
      ],
    });

    const accessToken = await this.genarateAccessToken(user.id);

    return { accessToken };
  }

  private genarateAccessToken(userId: string) {
    return this.jwtService.signAsync({ sub: userId });
  }
}
