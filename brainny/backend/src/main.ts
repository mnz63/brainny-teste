import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appDataSource } from './data-source';
import Records from './db/models/record.entity';
import User from './db/models/user.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  await app.listen(3001);
  await appDataSource
    .initialize()
    .then(() => console.log('Connected to DataBase'));
}
bootstrap();
