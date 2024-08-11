import { PaginationOptionsDto } from '@common/dtos';
import { CoreEntity } from '@common/entities';
import { CrudService } from '@common/services';
import { Body, Delete, Get, Patch, Post, Query } from '@nestjs/common';

export class CrudController<T extends CoreEntity> {
  constructor(protected readonly service: CrudService<T>) {}

  @Get()
  async pagination(@Query() options: PaginationOptionsDto): Promise<{
    items: T[];
    total: number;
  }> {
    return await this.service.paginate(options);
  }

  @Get('/:id')
  async findById(@Query('id') id: number): Promise<T> {
    return await this.service.findById(id);
  }

  @Post()
  async create(@Body() data: unknown): Promise<T> {
    return await this.service.create(data as T);
  }

  @Patch('/:id')
  async update(@Query('id') id: number, @Body() data: unknown): Promise<T> {
    return await this.service.update(id, data as T);
  }

  @Delete('/:id/delete')
  async delete(@Query('id') id: number): Promise<boolean> {
    return await this.service.delete(id);
  }

  @Post('/:id/restore')
  async restore(@Query('id') id: number): Promise<boolean> {
    return await this.service.restore(id);
  }

  @Delete('/:id/destroy')
  async destroy(@Query('id') id: number): Promise<boolean> {
    return await this.service.hardDelete(id);
  }
}
