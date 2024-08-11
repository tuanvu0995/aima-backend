import { IsDateString } from 'class-validator';

export class MonthlySaleReportDto {
  @IsDateString()
  date: Date;
}
