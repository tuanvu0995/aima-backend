import { CrudService } from '@common/services';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from './supplier.entity';

@Injectable()
export class SupplierService extends CrudService<Supplier> {
  constructor(
    @InjectRepository(Supplier)
    protected readonly userRepo: Repository<Supplier>,
  ) {
    super(userRepo);
  }
}
