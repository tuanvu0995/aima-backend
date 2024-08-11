import { IsOptional, IsString } from 'class-validator';

export class CreateSupplierDto {
  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsString()
  address: string;
}

export class UpdateSupplierDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  code: string;

  @IsString()
  @IsOptional()
  address: string;
}
