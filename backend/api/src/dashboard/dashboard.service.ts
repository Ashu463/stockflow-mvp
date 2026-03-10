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

    const lowStockItems = products.filter(p => p.quantity <= 5)

    return {
      totalProducts,
      totalQuantity,
      products,
      lowStockItems
    }
  }

}