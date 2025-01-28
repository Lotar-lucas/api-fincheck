import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { type Prisma } from '@prisma/client';

@Injectable()
export class CategoriesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findMany(findManyDto: Prisma.CategoryFindManyArgs) {
    return this.prismaService.category.findMany(findManyDto);
  }

  findFirst(findFirstDto: Prisma.CategoryFindFirstArgs) {
    return this.prismaService.category.findFirst(findFirstDto);
  }

  //Todo - Apply the following methods when developing category functionality
  // create(createUserDto: Prisma.UserCreateArgs) {
  //   return this.prismaService.user.create(createUserDto);
  // }

  // bulkCreateCategories(categoriesDto: Prisma.CategoryCreateManyArgs) {
  //   return this.prismaService.category.createMany(categoriesDto);
  // }
}
