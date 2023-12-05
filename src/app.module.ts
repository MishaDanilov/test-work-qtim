import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { NewsModule } from './news/news.module';
import { Users } from "./users/users.entity";
import { News } from "./news/news.entity";
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    NewsModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.POSTGRESQL_HOST,
      port: Number(process.env.POSTGRESQL_PORT),
      username: process.env.POSTGRESQL_USER,
      password: process.env.POSTGRESQL_PASSWORD,
      database: process.env.POSTGRESQL_DATABASE,
      retryAttempts: 1,
      entities: [Users, News],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
