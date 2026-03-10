import { Injectable } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'

@Injectable()
export class ProductsService {

  constructor(private prisma: PrismaService) {}

  create(orgId: string, dto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        ...dto,
        organizationId: orgId,
        updatedAt: new Date()
      },
    })
  }

  findAll(orgId: string) {
    return this.prisma.product.findMany({
      where: { organizationId: orgId },
      orderBy: { createdAt: 'desc' },
    })
  }

  update(id: string, dto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: dto,
    })
  }

  delete(id: string) {
    return this.prisma.product.delete({
      where: { id },
    })
  }

}