import { Injectable } from "@nestjs/common";
import { Users } from "./users.entity";
import { CreateUsersDto } from "./dto";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async getUserById(userId: number): Promise<Users> {
    const user = await this.usersRepository.getById(userId);
    return user;
  }

  async getUserByEmail(email: string): Promise<Users> {
    const user = this.usersRepository.getByEmail(email);
    return user;
  }

  async create(createUsersDto: CreateUsersDto): Promise<Users> {
    const user = await this.usersRepository.createUser(createUsersDto);

    return user;
  }
}
