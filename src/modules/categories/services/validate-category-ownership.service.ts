import { Injectable, NotFoundException } from '@nestjs/common';

import { CategoriesRepository } from 'src/shared/database/repositories/categories.repositories';

@Injectable()
export class ValidateCategoryOwnershipService {
  constructor(private readonly categoriesRepo: CategoriesRepository) {}

  isValidOwner = async (
    userId: string,
    categoryId: string,
  ): Promise<boolean | void> => {
    const isOwner = await this.categoriesRepo.findFirst({
      where: {
        id: categoryId,
        userId,
      },
    });

    if (!isOwner) {
      throw new NotFoundException('Category not found');
    }
    return true;
  };
}
