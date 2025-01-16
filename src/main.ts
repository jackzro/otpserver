import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as https from 'https';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        'http://16.78.223.213:3000',
        'http://dashboard.sms123.online',
      ];

      // Allow requests with no origin (like mobile apps or Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },

    credentials: true,
  });
  await app.listen(3020);
}
bootstrap();
