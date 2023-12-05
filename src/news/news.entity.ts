import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Users } from "src/users/users.entity";

@Entity({ name: "news" })
export class News {
  constructor(fields?: Partial<Users>) {
    Object.assign(this, fields);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne("Users", "news")
  author: Users;
}
