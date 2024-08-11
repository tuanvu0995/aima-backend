import { SelectQueryBuilder } from 'typeorm';
import { PaginationOptionsDto } from './dtos';
import { CoreEntity } from './entities';

export function applyQuerySortOrder<T extends CoreEntity>(
  query: SelectQueryBuilder<T>,
  options: PaginationOptionsDto,
): SelectQueryBuilder<T> {
  if (options.sortBy) {
    query.orderBy(`${query.alias}.${options.sortBy}`, options.sortOrder);
  } else {
    query.orderBy(`${query.alias}.id`, 'DESC');
  }
  return query;
}

export function applyQueryRelations<T extends CoreEntity>(
  query: SelectQueryBuilder<T>,
  relations?: string[],
) {
  if (relations && relations.length) {
    relations.forEach((relation) => {
      // Check if the relation is already joined to avoid duplicates
      if (
        !query.expressionMap.joinAttributes.some(
          (join) => join.relation.propertyName === relation,
        )
      ) {
        query.leftJoinAndSelect(`${query.alias}.${relation}`, relation);
      }
    });
  }

  return query;
}
