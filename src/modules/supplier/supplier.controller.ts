import { CrudController } from '@common/controllers/crud.controller';
import { ApiAuthGuard } from '@modules/auth/guards';
import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateSupplierDto, UpdateSupplierDto } from './dtos/supplier.dto';
import { Supplier } from './supplier.entity';
import { SupplierService } from './supplier.service';

@Controller('suppliers')
export class SupplierController extends CrudController<Supplier> {
  constructor(protected readonly supplierService: SupplierService) {
    super(supplierService);
  }

  @Post('')
  @UseGuards(ApiAuthGuard)
  async create(@Body() createInput: CreateSupplierDto): Promise<Supplier> {
    return await this.supplierService.create(createInput);
  }

  @Patch('/:id')
  @UseGuards(ApiAuthGuard)
  async update(
    @Param('id') id: number,
    @Body() updateInput: UpdateSupplierDto,
  ): Promise<Supplier> {
    return await this.supplierService.update(id, updateInput);
  }
}
