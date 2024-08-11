import { CrudService } from '@common/services';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService extends CrudService<Product> {
  constructor(
    @InjectRepository(Product)
    protected readonly productRepo: Repository<Product>,
  ) {
    super(productRepo);
  }

  /*
  |--------------------------------------------------------------------------
  | Monthly Sales Report Endpoint: This endpoint should return a list of products with their average monthly sales for a given month.
  | This requires performing JOINs across tables, aggregate functions for sales data, and a WHERE clause to filter out products without sales.
  |--------------------------------------------------------------------------
  */
  async getMonthlySalesReport(date: Date) {
    const startDate = moment(date).startOf('month').format('YYYY-MM-DD');
    const endDate = moment(date).endOf('month').format('YYYY-MM-DD');
    const query = this.productRepo
      .createQueryBuilder('p')
      .select([
        'p.id as id',
        'p.name as name',
        'p.sku as sku',
        'COALESCE(Sum(s.quantity), 0) as totalSales',
        'COALESCE(SUM(s."quantity" * p.price), 0) AS totalRevenue',
      ])
      .leftJoin('p.sales', 's', 's.createdAt BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .groupBy('p.id')
      .addGroupBy("DATE_TRUNC('month', s.createdAt)")
      .orderBy('totalSales', 'DESC');

    const items = await query.getRawMany();
    const total = items.length;

    return { total, items };
  }

  /*
  |--------------------------------------------------------------------------
  | Restock Report Endpoint: This endpoint should return a list of products that need to be restocked.
  | The restock level is determined by the average monthly sales of each product, current inventory, and a predefined minimum stock threshold.
  | This requires performing JOINs across tables, aggregate functions for sales data, and a WHERE clause to filter out products above the threshold.
  |--------------------------------------------------------------------------
  */
  async getRestockReport() {
    const monthlySalesSubQuery = (qb: SelectQueryBuilder<Product>): string => {
      return qb
        .subQuery()
        .select([
          'p.id AS productId',
          'SUM(s.quantity) AS totalSales',
          "DATE_TRUNC('month', s.createdAt) AS saleMonth",
        ])
        .from('products', 'p')
        .innerJoin('sales', 's', 's.productId = p.id')
        .groupBy('p.id')
        .addGroupBy("DATE_TRUNC('month', s.createdAt)")
        .getQuery();
    };

    const avgMonthlySalesSubQuery = (
      qb: SelectQueryBuilder<Product>,
    ): string => {
      return qb
        .subQuery()
        .select([
          'monthly_sales.productId',
          'AVG(monthly_sales.totalSales) AS avg_sales',
        ])
        .from(`${monthlySalesSubQuery(qb)}`, 'monthly_sales')
        .groupBy('monthly_sales.productId')
        .getQuery();
    };

    const query = this.productRepo
      .createQueryBuilder('p')
      .select([
        'p.id AS id',
        'p.name AS name',
        'p.stock AS stock',
        'ROUND(COALESCE(avg_sales.avg_sales, 0), 0) AS avg_monthly_sales',
        'ROUND(GREATEST((COALESCE(avg_sales.avg_sales, 0) * 1.5) - p.stock, 0), 0) AS restock_quantity',
      ])
      .leftJoin(
        `${avgMonthlySalesSubQuery(this.productRepo.createQueryBuilder())}`,
        'avg_sales',
        'p.id = avg_sales.productId',
      )
      .where('p.stock < COALESCE(avg_sales.avg_sales, 0) * 1.5')
      .orderBy('restock_quantity', 'DESC');

    const items = await query.getRawMany();
    const total = items.length;
    return { total, items };
  }
}
