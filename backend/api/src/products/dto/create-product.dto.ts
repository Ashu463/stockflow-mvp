import { IsInt, IsOptional, IsString, IsNumber } from 'class-validator'

export class CreateProductDto {

  @IsString()
  name: string

  @IsString()
  sku: string

  @IsOptional()
  @IsString()
  description?: string

  @IsInt()
  quantity: number

  @IsOptional()
  @IsNumber()
  costPrice?: number

  @IsOptional()
  @IsNumber()
  sellingPrice?: number

  @IsOptional()
  @IsInt()
  lowStockThreshold?: number
}