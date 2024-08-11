import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';

export class PaginationOptionsDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit: number = 10;

  @IsOptional()
  @IsEnum(['id', 'updatedAt'])
  sort: string;

  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  order: 'ASC' | 'DESC' = 'DESC';

  get skip() {
    return (this.page - 1) * this.limit;
  }

  get take() {
    return this.limit;
  }

  get sortBy() {
    return this.sort || 'id';
  }

  get sortOrder() {
    return this.order;
  }
}
