import { ProductModule } from '@modules/product';
import { SaleModule } from '@modules/sale';
import { Module } from '@nestjs/common';
import { ReportService } from './report.service';

@Module({
  imports: [ProductModule, SaleModule],
  providers: [ReportService],
  exports: [ReportService],
})
export class ReportModule {}
