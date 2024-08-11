import { Controller, Get, Param } from '@nestjs/common';
import { MonthlySaleReportDto } from './dtos';
import { ReportService } from './report.service';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('restock')
  async getRestockReport() {
    return await this.reportService.getRestockReport();
  }

  @Get('monthly-sales/:date')
  async getMonthlySalesReport(@Param() { date }: MonthlySaleReportDto) {
    return await this.reportService.getMonthlySalesReport(date);
  }
}
