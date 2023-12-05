import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { News } from "./news.entity";

@Injectable()
export class NewsRepository extends Repository<News> {
  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>,
    readonly dataSource: DataSource
  ) {
    super(News, dataSource.createEntityManager());
  }

  async getById(id: number): Promise<News> {
    return this.newsRepository.findOne({
      where: {
        id,
      },
    });
  }

  async getByUserId(userId: number): Promise<News[]> {
    return this.newsRepository
      .createQueryBuilder("news")
      .innerJoinAndSelect("news.author", "author")
      .where("author.id = :userId", { userId })
      .getMany();
  }

  async saveNews(news: Partial<News>): Promise<News> {
    return this.newsRepository.save(news);
  }
}
