import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { join } from 'path';
import { MorganMiddleware } from '@nest-middlewares/morgan';
import { CompressionMiddleware } from '@nest-middlewares/compression';
import { CorsMiddleware } from '@nest-middlewares/cors';

import { LoggerMiddleware } from './configs/middleware';
import { ormConfig } from './configs/orm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AllExceptionsFilter } from './exception-filter/all.exceptions.filter';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UserModuleAdmin } from './module-client/user/user.module';
import { ConversationModuleAdmin } from './module-client/conversation/conversation.module';
import { MessageModuleAdmin } from './module-client/message/message.module';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useFactory: ormConfig }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..'),
    }),
    UserModuleAdmin,
    ConversationModuleAdmin,
    MessageModuleAdmin,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    MorganMiddleware.configure('dev');
    CompressionMiddleware.configure({});
    CorsMiddleware.configure({});
    consumer.apply(MorganMiddleware, CompressionMiddleware).forRoutes('*');
  }
}
