import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get('DATABASE_URL'),
        entities: ['dist/**/*.entity{.ts,.js}'],
        migrations: ['dist/migrations/*{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: false,
        logging: config.get('NODE_ENV') !== 'production',
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
