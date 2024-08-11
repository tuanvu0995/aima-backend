import { CrudService } from '@common/services';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService extends CrudService<User> {
  constructor(
    @InjectRepository(User)
    protected readonly userRepo: Repository<User>,
  ) {
    super(userRepo);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepo.findOne({ where: { email } });
  }
}
