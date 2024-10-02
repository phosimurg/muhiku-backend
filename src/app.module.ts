import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();

// Eğer uploads klasörü yoksa oluştur
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
