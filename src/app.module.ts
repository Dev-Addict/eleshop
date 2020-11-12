import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.dev'
    }),
    MongooseModule.forRoot(
      process.env.DATABASE_URI
        .replace('<password>', process.env.DATABASE_PASSWORD)
        .replace('<dbname>', process.env.DATABASE_NAME)
    )
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
