import { ConflictException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(data: User): Promise<User> {
    const exist = await this.databaseService.user.findUnique({
      where: {
        email: data?.email,
      },
    });
    if (exist) {
      throw new ConflictException('User already exists');
    }
    return this.databaseService.user.create({ data });
  }

  async findAll(): Promise<User[]> {
    return this.databaseService.user.findMany();
  }
}
