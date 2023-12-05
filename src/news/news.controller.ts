import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { NewsService } from "./news.service";
import { CreateNewsDto } from "./dto";
import { ValidationPipe } from "src/pipes/validation.pipe";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Controller("news")
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get(":newsId")
  getByNewsId(@Param("newsId") newsId: number) {
    return this.newsService.getByNewsId(newsId);
  }

  @Get("/user/:userId")
  getAllByUserId(@Param("userId") userId: number) {
    return this.newsService.getAllByUserId(userId);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() newsDto: CreateNewsDto, @Req() request) {
    return this.newsService.create(newsDto, request.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Put(":newsId")
  update(@Body() newsDto: CreateNewsDto, @Param("newsId") newsId: number) {
    return this.newsService.update(newsDto, newsId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":newsId")
  delete(@Param("newsId") newsId: number) {
    return this.newsService.delete(newsId);
  }
}
