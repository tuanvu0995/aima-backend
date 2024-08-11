import { CrudController } from '@common/controllers/crud.controller';
import { Controller } from '@nestjs/common';
import { Supplier } from './supplier.entity';
import { SupplierService } from './supplier.service';

@Controller('suppliers')
export class SupplierController extends CrudController<Supplier> {
  constructor(protected readonly supplierService: SupplierService) {
    super(supplierService);
  }
}
