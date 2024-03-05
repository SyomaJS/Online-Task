import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import * as cookieParser from 'cookie-parser';

const start = async () => {
  try {
    const config = new DocumentBuilder()
      .setTitle('Online Courses')
      .setDescription('Project for students online courses')
      .setVersion('1.0.0')
      .addTag('NodeJS')
      .build();

    const PORT = process.env.PORT || 3333;
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);
    app.enableCors({ origin: 'http://localhost:3000', credentials: true });
    useContainer(app.select(AppModule));
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    await app.listen(PORT, () => {
      console.log(`Server running at ${PORT} port ✅`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
