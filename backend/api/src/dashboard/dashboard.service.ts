import { Injectable } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'

@Injectable()
export class DashboardService {

  constructor(private prisma: PrismaService) {}

  async getDashboard(orgId: string) {

    const totalProducts = await this.prisma.product.count({
      where: { organizationId: orgId }
    })

    const quantityAgg = await this.prisma.product.aggregate({
      where: { organizationId: orgId },
      _sum: {
        quantity: true
      }
    })

    const lowStockItems = await this.prisma.product.findMany({
      where: {
        organizationId: orgId,
        quantity: {
          lte: this.prisma.product.fields.lowStockThreshold
        }
      },
      select: {
        name: true,
        sku: true,
        quantity: true,
        lowStockThreshold: true
      }
    })

    return {
      totalProducts,
      totalQuantity: quantityAgg._sum.quantity || 0,
      lowStockItems
    }
  }

}