import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = +process.env.APP_PORT || 4200;
  app.setGlobalPrefix('api');
  console.log('Port running on: ', port);

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Articlex')
    .setDescription('The Articlex API description')
    .setVersion('1.0')
    .addTag('Article')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('swagger', app, document);

  app.enableCors();

  await app.listen(4200);
}
bootstrap();
