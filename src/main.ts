import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as https from 'https';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://16.78.223.213:3000',
    credentials: true,
  });
  await app.listen(3020);
}
bootstrap();
