import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { APP_CONFIG } from './configs/app.config';
import nestConfig from './configs/nest.config';
import bootstrapConfig from './configs/bootstrap.config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const logger: Logger = new Logger('Main');
const port = APP_CONFIG.ENV.APP.PORT || 9999;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  nestConfig(app);
  bootstrapConfig();

  const config = new DocumentBuilder()
    .setTitle('TRUE MATE AI')
    .setDescription('True mate AI API description')
    .setVersion('1.0')
    .addTag('TRUE MATE AI')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port, () => {
    logger.log(`Application listening on port ${port} or http://localhost:${port}`);
  });
}

bootstrap();
