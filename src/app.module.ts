import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { User, UserSchema } from './users/schemas/user.schema';

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
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      }
    ]),
    UsersModule
  ]
})
export class AppModule {}
