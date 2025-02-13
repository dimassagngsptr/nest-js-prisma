import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProductService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createProductDto: Prisma.ProductCreateInput) {
    return this.databaseService.product.create({ data: createProductDto });
  }

  findAll() {
    return this.databaseService.product.findMany({});
  }

  findOne(id: number) {
    return this.databaseService.product.findUnique({ where: { id } });
  }

  update(id: number, updateProductDto: Prisma.ProductUpdateInput) {
    return this.databaseService.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  remove(id: number) {
    return this.databaseService.product.delete({ where: { id } });
  }
}
