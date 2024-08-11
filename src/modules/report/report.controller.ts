import { ApiAuthGuard } from '@modules/auth/guards/api-auth.guard';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { MonthlySaleReportDto } from './dtos';
import { ReportService } from './report.service';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('restock')
  @UseGuards(ApiAuthGuard)
  async getRestockReport() {
    return await this.reportService.getRestockReport();
  }

  @Get('monthly-sales/:date')
  @UseGuards(ApiAuthGuard)
  async getMonthlySalesReport(@Param() { date }: MonthlySaleReportDto) {
    return await this.reportService.getMonthlySalesReport(date);
  }
}
