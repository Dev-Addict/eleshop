import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.dev'
    }),
    MongooseModule.forRoot(
      process.env.DATABASE_URI
        .replace('<password>', process.env.DATABASE_PASSWORD)
        .replace('<dbname>', process.env.DATABASE_NAME)
    ),
    UsersModule,
    AuthModule,
    CategoriesModule
  ]
})
export class AppModule {}
