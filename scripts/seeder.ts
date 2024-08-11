import { DatabaseModule } from '@modules/database';
import { HashModule } from '@modules/hash';
import { UsersSeeder } from '@modules/user/seeds/user.seed';
import { User } from '@modules/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { seeder } from 'nestjs-seeder';

seeder({
  imports: [DatabaseModule, TypeOrmModule.forFeature([User]), HashModule],
}).run([UsersSeeder]);
