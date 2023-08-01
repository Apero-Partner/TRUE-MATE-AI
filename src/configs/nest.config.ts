import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'express';

function nestConfig(app) {
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors): BadRequestException => new BadRequestException(errors, 'Validation error'),
    }),
  );
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
}
export default function (app) {
  nestConfig(app);
}
