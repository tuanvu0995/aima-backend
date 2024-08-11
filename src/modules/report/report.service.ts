import { ProductService } from '@modules/product';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportService {
  constructor(private readonly productService: ProductService) {}

  async getRestockReport() {
    return await this.productService.getRestockReport();
  }

  async getMonthlySalesReport(date: Date) {
    return await this.productService.getMonthlySalesReport(date);
  }
}
