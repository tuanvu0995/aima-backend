import { PaginationOptionsDto } from '@common/dtos';
import { CoreEntity } from '@common/entities';
import { CrudService } from '@common/services';
import { ApiAuthGuard } from '@modules/auth/guards';
import {
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

export class CrudController<T extends CoreEntity> {
  constructor(protected readonly service: CrudService<T>) {}

  @Get()
  @UseGuards(ApiAuthGuard)
  async pagination(@Query() options: PaginationOptionsDto): Promise<{
    items: T[];
    total: number;
  }> {
    return await this.service.paginate(options);
  }

  @Get('/:id')
  @UseGuards(ApiAuthGuard)
  async findById(@Query('id') id: number): Promise<T> {
    return await this.service.findById(id);
  }

  @Post()
  @UseGuards(ApiAuthGuard)
  async create(@Body() data: unknown): Promise<T> {
    return await this.service.create(data as T);
  }

  @Patch('/:id')
  @UseGuards(ApiAuthGuard)
  async update(@Param('id') id: number, @Body() data: unknown): Promise<T> {
    return await this.service.update(id, data as T);
  }

  @Delete('/:id')
  @UseGuards(ApiAuthGuard)
  async delete(@Param('id') id: number): Promise<{ deleted: boolean }> {
    return await this.service.delete(id);
  }

  @Post('/:id/restore')
  @UseGuards(ApiAuthGuard)
  async restore(@Param('id') id: number): Promise<{ restored: boolean }> {
    return await this.service.restore(id);
  }

  @Delete('/:id/destroy')
  @UseGuards(ApiAuthGuard)
  async destroy(@Param('id') id: number): Promise<{ deleted: boolean }> {
    return await this.service.hardDelete(id);
  }
}
