import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET, HEAD, PUT, POST, PATCH, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  const port = process.env.PORT ?? 8000;
  console.log(`🚀 Server is starting on port: ${port}`); 

  await app.listen(port, '0.0.0.0'); 
}

bootstrap();
