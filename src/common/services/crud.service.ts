import { PaginationOptionsDto } from '@common/dtos';
import { CoreEntity } from '@common/entities';
import {
  applyQueryRelations,
  applyQuerySortOrder,
} from '@common/query-builder';
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class CrudService<T extends CoreEntity> {
  protected readonly logger = new Logger(CrudService.name);

  constructor(
    @InjectRepository(CoreEntity)
    protected readonly repo: Repository<T>,
  ) {}

  async exists(where: FindOptionsWhere<T>) {
    return await this.repo.exists({
      where,
    });
  }

  async findByField(
    where: FindOptionsWhere<T>,
    relations: string[] = [],
  ): Promise<T> {
    this.logger.debug(`Finding ${this.repo.metadata.name} by ${where}}`);
    const found = await this.repo.findOne({
      where,
      relations,
    });
    if (!found?.id) {
      this.logger.error(`${this.repo.metadata.name} not found`);
      throw new NotFoundException(`${this.repo.metadata.name} not found`);
    }
    return found;
  }

  async findById(id: number, relations: string[] = []): Promise<T> {
    return await this.findByField({ id } as FindOptionsWhere<T>, relations);
  }

  async findAll(relations: string[] = []): Promise<T[]> {
    this.logger.debug(`Finding all ${this.repo.metadata.name}`);
    return await this.repo.find({
      relations,
    });
  }

  async paginate(
    options: PaginationOptionsDto,
    relations: string[] = [],
  ): Promise<{
    items: T[];
    total: number;
  }> {
    this.logger.debug(`Paginating ${this.repo.metadata.name}`);
    const alias = this.repo.metadata.name;
    const query = this.repo.createQueryBuilder(alias);

    applyQueryRelations(query, relations);
    applyQuerySortOrder(query, options);

    query.skip(options.skip).take(options.take);

    const [items, total] = await query.getManyAndCount();
    return { items, total };
  }

  async create(data: any) {
    const created = this.repo.create(data as any) as any;
    const saved = await this.repo.save(created);
    if (!saved) {
      this.logger.error(`Failed to create ${this.repo.metadata.name}`);
      throw new BadRequestException(
        `Failed to create ${this.repo.metadata.name}`,
      );
    }
    return saved as T;
  }

  async update(id: number, data: any) {
    const found = await this.findById(id);
    const updated = await this.repo.save({ ...found, ...data });
    if (!updated) {
      this.logger.error(`Failed to update ${this.repo.metadata.name}`);
      throw new BadRequestException(
        `Failed to update ${this.repo.metadata.name}`,
      );
    }
    return updated;
  }

  async delete(id: number) {
    const removed = await this.repo.softDelete({
      id,
    } as any);
    if (!removed.affected) {
      this.logger.error(`Failed to remove ${this.repo.metadata.name}`);
      throw new BadRequestException(
        `Failed to remove ${this.repo.metadata.name}`,
      );
    }
    return {
      deleted: true,
    };
  }

  async restore(id: number) {
    const restored = await this.repo.restore({
      id,
    } as any);
    if (!restored.affected) {
      this.logger.error(`Failed to restore ${this.repo.metadata.name}`);
      throw new BadRequestException(
        `Failed to restore ${this.repo.metadata.name}`,
      );
    }
    return {
      restored: true,
    };
  }

  async hardDelete(id: number) {
    const removed = await this.repo.delete({
      id,
    } as any);
    if (!removed.affected) {
      this.logger.error(`Failed to hard delete ${this.repo.metadata.name}`);
      throw new BadRequestException(
        `Failed to hard delete ${this.repo.metadata.name}`,
      );
    }
    return {
      deleted: true,
    };
  }
}
