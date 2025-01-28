import { Injectable, NotFoundException } from '@nestjs/common';

import { TransactionRepository } from 'src/shared/database/repositories/transactions.repositories';

@Injectable()
export class ValidateTransactionOwnershipService {
  constructor(private readonly transactionRepo: TransactionRepository) {}

  isValidOwner = async (
    userId: string,
    transactionId: string,
  ): Promise<boolean | void> => {
    const isOwner = await this.transactionRepo.findFirst({
      where: {
        id: transactionId,
        userId,
      },
    });

    if (!isOwner) {
      throw new NotFoundException('Transaction not found');
    }
    return true;
  };
}
