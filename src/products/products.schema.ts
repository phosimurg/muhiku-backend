import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  stock: number;

  @Prop()
  featuredImage: string;

  get isOutOfStock() {
    return this.stock <= 0;
  }
}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.virtual('isOutOfStock').get(function () {
  return this.stock <= 0;
});
