import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { News } from "./news.entity";
import { CreateNewsDto } from "./dto";
import { UsersService } from "src/users/users.service";
import { NewsRepository } from "./news.repository";

@Injectable()
export class NewsService {
  constructor(
    private newsRepository: NewsRepository,
    private usersService: UsersService
  ) {}

  async getByNewsId(newsId: number): Promise<News> {
    const news = await this.newsRepository.getById(newsId);

    if (news) return news;

    throw new HttpException("The news does not exist", HttpStatus.NOT_FOUND);
  }

  async getAllByUserId(userId: number): Promise<News[]> {
    const news = await this.newsRepository.getByUserId(userId);

    return news;
  }

  async create(newsDto: CreateNewsDto, userId: number): Promise<News> {
    const author = await this.usersService.getUserById(userId);
    const createdNews = await this.newsRepository.saveNews({
      ...newsDto,
      author,
    });

    return createdNews;
  }

  async update(newsDto: CreateNewsDto, newsId: number): Promise<News> {
    const news = await this.getByNewsId(newsId);

    const updatedNews = await this.newsRepository.saveNews({
      ...news,
      ...newsDto,
    });

    return updatedNews;
  }

  async delete(newsId: number): Promise<void> {
    const news = await this.getByNewsId(newsId);

    await this.newsRepository.remove(news);
  }
}
