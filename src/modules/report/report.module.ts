import { ProductModule } from '@modules/product';
import { SaleModule } from '@modules/sale';
import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';

@Module({
  imports: [ProductModule, SaleModule],
  controllers: [ReportController],
  providers: [ReportService],
  exports: [ReportService],
})
export class ReportModule {}
