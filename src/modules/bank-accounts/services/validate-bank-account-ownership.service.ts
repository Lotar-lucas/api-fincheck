import { Injectable, NotFoundException } from '@nestjs/common';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';

@Injectable()
export class ValidateBankAccountOwnershipService {
  constructor(private readonly bankAccountsRepo: BankAccountsRepository) {}

  isValidOwner = async (
    userId: string,
    bankAccountId: string,
  ): Promise<boolean | void> => {
    const isOwner = await this.bankAccountsRepo.findFirst({
      where: {
        id: bankAccountId,
        userId,
      },
    });

    if (!isOwner) {
      throw new NotFoundException('Bank account not found');
    }
    return true;
  };
}
