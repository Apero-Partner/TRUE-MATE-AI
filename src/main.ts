import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { APP_CONFIG } from './configs/app.config';
import nestConfig from './configs/nest.config';
import bootstrapConfig from './configs/bootstrap.config';

const logger: Logger = new Logger('Main');
const port = APP_CONFIG.ENV.APP.PORT || 9999;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  nestConfig(app);
  bootstrapConfig();

  await app.listen(port, () => {
    logger.log(`Application listening on port ${port} or http://localhost:${port}`);
  });
}

bootstrap();
