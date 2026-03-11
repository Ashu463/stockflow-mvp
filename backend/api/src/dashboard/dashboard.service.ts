import { Injectable } from "@nestjs/common"
import { PrismaService } from "prisma/prisma.service"

@Injectable()
export class DashboardService {

  constructor(private prisma: PrismaService) {}

  async getDashboard() {

    const products = await this.prisma.product.findMany({
      include: {
        organization: true
      }
    })

    const totalProducts = products.length

    const totalQuantity = products.reduce((sum, p) => {
      return sum + p.quantity
    }, 0)

    const lowStockItems = await this.prisma.product.findMany({
      where: {
        quantity: {
          lte: 5
        }
      },
      select: {
        id: true,
        name: true,
        sku: true,
        quantity: true,
        lowStockThreshold: true
      }
    })

    return {
      totalProducts,
      totalQuantity,
      products,
      lowStockItems
    }
  }

}