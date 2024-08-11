import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';

@Module({
  providers: [SupplierService]
})
export class SupplierModule {}
