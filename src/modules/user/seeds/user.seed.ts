import { HashService } from '@modules/hash';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { User, UserRole } from '../user.entity';

@Injectable()
export class UsersSeeder implements Seeder {
  private readonly logger = new Logger(UsersSeeder.name);
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    private readonly hashService: HashService,
  ) {}

  async seed(): Promise<any> {
    this.logger.log('Seeding users');
    const userData = [
      {
        email: 'admin@gmail.com',
        password: 'password',
        name: 'Admin',
        verified: true,
        role: UserRole.ADMIN,
      },
      {
        email: 'staff1@gmail.com',
        password: 'password',
        name: 'Staff 1',
        verified: true,
        role: UserRole.STAFF,
      },
      {
        email: 'staff2@gmail.com',
        password: 'password',
        name: 'Staff 2',
        verified: true,
        role: UserRole.STAFF,
      },
    ];

    for (const user of userData) {
      user.password = await this.hashService.hash(user.password);
    }

    await this.user.save(this.user.create(userData as any[]));
    this.logger.log(`${userData.length} users created`);
  }

  async drop(): Promise<any> {
    return this.user.delete({});
  }
}
