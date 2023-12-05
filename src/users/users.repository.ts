import { DataSource, Repository } from "typeorm";
import { Users } from "./users.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UsersRepository extends Repository<Users> {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    readonly dataSource: DataSource
  ) {
    super(Users, dataSource.createEntityManager());
  }

  async getById(id: number): Promise<Users> {
    return this.usersRepository.findOne({
      where: {
        id,
      },
    });
  }

  async getByEmail(email: string): Promise<Users> {
    return this.usersRepository.findOne({
      where: {
        email,
      },
    });
  }

  async createUser(user: Partial<Users>): Promise<Users> {
    return this.usersRepository.save(user);
  }
}
