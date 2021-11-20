import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Desafio Chapter de Services')
  .setDescription('Produzir uma API que, dado o nome de uma pessoa, retornar sua possível nacionalidade, sexo e idade, além de uma frase motivacional. Exemplo de entrada e retorno:')
  .setVersion('1.0')
  .addTag('app')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(3000);
}
bootstrap();
