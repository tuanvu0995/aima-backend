import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './modules/auth';
import { DatabaseModule } from './modules/database';
import { ProductModule } from './modules/product';
import { SaleModule } from './modules/sale';
import { SupplierModule } from './modules/supplier';
import { UserModule } from './modules/user';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '7d' },
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    SaleModule,
    ProductModule,
    SupplierModule,
  ],
})
export class AppModule {}
