import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: `${process.env.BACKEND_URL}`,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.setGlobalPrefix('api');

  const port = process.env.PORT || 8000;
  await app.listen(port);
  console.log(`Gateway Service Running at:\nPort: ${port}`);
}

bootstrap().catch((err: Error) => {
  console.error('Terjadi kesalahan saat memulai Gateway:', err);
  process.exit(1);
});
