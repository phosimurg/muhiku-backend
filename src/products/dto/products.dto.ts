import { IsString, IsNumber, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Ürün Adı' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Ürün açıklaması' })
  @IsString()
  description: string;

  @ApiProperty({ example: 100 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 50 })
  @IsNumber()
  @Min(0)
  stock: number;

  @ApiProperty({ example: 'http://example.com/image.png' })
  @IsOptional()
  @IsString()
  featuredImage?: string;
}
