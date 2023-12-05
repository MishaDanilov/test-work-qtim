import { Module } from "@nestjs/common";
import { NewsService } from "./news.service";
import { NewsController } from "./news.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { News } from "./news.entity";
import { UsersModule } from "src/users/users.module";
import { NewsRepository } from "./news.repository";
import { AuthModule } from "src/auth/auth.module";

@Module({
  providers: [NewsService, NewsRepository],
  controllers: [NewsController],
  imports: [TypeOrmModule.forFeature([News]), UsersModule, AuthModule],
})
export class NewsModule {}
