import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import { join } from 'path';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // todo Change path if run in Docker
  const swaggerDescription = await fs.readFileSync(
    join(__dirname, '../', './description.markdown'),
  );
  const config = new DocumentBuilder()
    .setTitle('Okten')
    // .setDescription('The users API description')
    .setDescription(swaggerDescription.toString())
    .setVersion('1.0')
    .addTag('sep-2021')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
