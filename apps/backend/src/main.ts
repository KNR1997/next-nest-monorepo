import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3001',
      'http://localhost:3002',
      process.env.N8N_UI_URL || 'http://localhost:5678'
    ],
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
