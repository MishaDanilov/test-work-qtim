import { IsString, Length } from "class-validator";

export class CreateNewsDto {
  constructor(newsData: CreateNewsDto) {
    Object.assign(this, newsData);
  }

  @IsString({ message: 'Should be string' })
  @Length(5, 50, { message: 'Should has length from 5 to 20' })
  title: string;

  @IsString({ message: 'Should be string' })
  @Length(20, 500, { message: 'Should has length from 5 to 20' })
  content: string;
}
