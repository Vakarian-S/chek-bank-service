import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountHttpModule } from './domain/account/account-http.module';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    AccountHttpModule,
    TypeOrmModule.forRoot(typeOrmConfig.options),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            utilities.format.nestLike('RequestService'),
          ),
        }),
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
