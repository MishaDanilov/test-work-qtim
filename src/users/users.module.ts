import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
  ],
  exports: [UsersService],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}
