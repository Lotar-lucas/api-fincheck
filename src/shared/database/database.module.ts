import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsersRepository } from './repositories/users.repositories';
import { CategoriesRepository } from './repositories/categories.repositories';
import { bankAccountsRepository } from './repositories/bank-accounts.repositories';

@Global()
@Module({
  providers: [
    PrismaService,
    UsersRepository,
    CategoriesRepository,
    bankAccountsRepository,
  ],
  exports: [UsersRepository, CategoriesRepository, bankAccountsRepository],
})
export class DatabaseModule {}
