import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './products.schema';
import { CreateProductDto } from './dto/products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(createProductDto);
    return newProduct.save();
  }

  async findAll(query: any): Promise<Product[]> {
    const filters = {};
    if (query.name) {
      filters['name'] = { $regex: query.name, $options: 'i' };
    }
    if (query.minPrice && query.maxPrice) {
      filters['price'] = { $gte: query.minPrice, $lte: query.maxPrice };
    }

    const sort = {};
    if (query.sortBy && query.order) {
      sort[query.sortBy] = query.order === 'desc' ? -1 : 1;
    }

    return this.productModel
      .find(filters)
      .sort(sort)
      .lean({ virtuals: true })
      .exec();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel
      .findById(id)
      .lean({ virtuals: true })
      .exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(
    id: string,
    updateProductDto: CreateProductDto,
  ): Promise<Product> {
    const existingProduct = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
    if (!existingProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return existingProduct;
  }

  async remove(id: string): Promise<any> {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    if (result === null) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return result;
  }
}
