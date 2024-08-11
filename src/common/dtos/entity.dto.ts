import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationOptionsDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform((value) => Number(value.value))
  page: number = 1;

  @IsOptional()
  @IsInt()
  @Min(10)
  @Max(250)
  @Transform((value) => Number(value.value))
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
