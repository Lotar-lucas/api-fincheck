import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from '../../shared/database/repositories/users.repositories';
import { hash } from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password, name } = createUserDto;

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

    return user;
  }
}
