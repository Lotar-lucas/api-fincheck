import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';
import { bankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';

@Injectable()
export class ValidateBankAccountOwnershipService {
  constructor(private readonly banckAccountsRepo: bankAccountsRepository) {}

  isValidOwner = async (
    userId: string,
    banckAccountId: string,
  ): Promise<boolean | void> => {
    const isOwner = await this.banckAccountsRepo.findFirst({
      where: {
        id: banckAccountId,
        userId,
      },
    });

    if (!isOwner) {
      throw new NotFoundException('Bank account not found');
    }
    return true;
  };
}
