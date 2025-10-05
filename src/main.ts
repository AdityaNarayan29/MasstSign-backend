import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for your frontend
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3001', // frontend URL
    credentials: true, // needed if sending cookies
  });
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  await app.listen(port);
  console.log(`Server running on http://localhost:${port}`);
}
bootstrap();
