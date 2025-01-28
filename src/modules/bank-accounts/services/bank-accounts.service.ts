import { Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';
import { ValidateBankAccountOwnershipService } from './validate-bank-account-ownership.service';
import { BankAccountType } from '@prisma/client';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly banckAccountsRepo: BankAccountsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
  ) {}

  create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    const { name, initialBalance, type, color } = createBankAccountDto;

    return this.banckAccountsRepo.create({
      data: {
        userId,
        name,
        initialBalance,
        type,
        color,
      },
    });
  }

  async findAllByUserId(userId: string) {
    const bankAccounts = (await this.banckAccountsRepo.findMany({
      where: { userId },
      include: {
        transactions: {
          select: {
            type: true,
            value: true,
          },
        },
      },
    })) as Array<{
      name: string;
      initialBalance: number;
      type: BankAccountType;
      color: string;
      id: string;
      userId: string;
      transactions: Array<{ type: string; value: number }>;
    }>;

    return bankAccounts.map(({ transactions, ...bankAccount }) => {
      const totalTransactions = transactions.reduce((acc, transaction) => {
        return (
          acc +
          (transaction.type === 'income'
            ? transaction.value
            : -transaction.value)
        );
      }, 0);

      const currentBalance = bankAccount.initialBalance + totalTransactions;

      return {
        ...bankAccount,
        currentBalance,
        transactions,
      };
    });
  }

  async findOne(userId: string, bankAccountId: string) {
    await this.validateBankAccountOwnershipService.isValidOwner(
      userId,
      bankAccountId,
    );

    return this.banckAccountsRepo.findOne({
      where: { id: bankAccountId },
    });
  }

  async update(
    userId: string,
    bankAccountId: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ) {
    await this.validateBankAccountOwnershipService.isValidOwner(
      userId,
      bankAccountId,
    );

    const { name, initialBalance, type, color } = updateBankAccountDto;

    return this.banckAccountsRepo.update({
      where: { id: bankAccountId },
      data: {
        name,
        initialBalance,
        type,
        color,
      },
    });
  }

  async remove(userId: string, bankAccountId: string) {
    await this.validateBankAccountOwnershipService.isValidOwner(
      userId,
      bankAccountId,
    );

    await this.banckAccountsRepo.delete({
      where: { id: bankAccountId },
    });
  }
}
