import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as https from 'https';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://dashboardsms123.s3-website.ap-southeast-3.amazonaws.com',
    credentials: true,
  });
  await app.listen(3020);
}
bootstrap();
