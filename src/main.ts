import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads', // Dosya erişim yolu: http://localhost:3000/uploads/filename
  });

  const config = new DocumentBuilder()
    .setTitle('Ürün Yönetim Sistemi API')
    .setDescription(
      "Ürünlerin eklenmesi, güncellenmesi, silinmesi ve listelenmesi API'si",
    )
    .setVersion('1.0')
    .addTag('products')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
