import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';

@Module({
  providers: [SaleService]
})
export class SaleModule {}
