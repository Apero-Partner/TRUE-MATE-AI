import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { Response } from 'express';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

@Catch(HttpException)
export class AllExceptionsFilter implements ExceptionFilter {
  logger = new Logger('AllExceptionsFilter');
  constructor() {}

  async catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();

    const message = exception.getResponse() as {
      time: any;
      message;
    };

    const jsonResponse = {
      statusCode,
    };

    if (message.time) {
      jsonResponse['time'] = message.time;
    }

    jsonResponse['message'] = message;

    response.status(statusCode).json(jsonResponse);
  }
}
