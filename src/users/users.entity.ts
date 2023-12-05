import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { News } from "src/news/news.entity";

@Entity({ name: "users" })
export class Users {
  constructor(fields?: Partial<Users>) {
    Object.assign(this, fields);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany("News", "author")
  posts: News[];
}
