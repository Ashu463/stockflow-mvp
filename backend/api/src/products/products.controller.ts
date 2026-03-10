import { Body, Controller, Delete, Get, Headers, Param, Patch, Post } from '@nestjs/common'
import { ProductsService } from './products.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'

@Controller('products')
export class ProductsController {

  constructor(private productsService: ProductsService) {}

  @Post()
  create(
    @Headers('x-org-id') orgId: string,
    @Body() dto: CreateProductDto,
  ) {
    return this.productsService.create(orgId, dto)
  }

  @Get()
  findAll(@Headers('x-org-id') orgId: string) {
    return this.productsService.findAll(orgId)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
  ) {
    return this.productsService.update(id, dto)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productsService.delete(id)
  }

}