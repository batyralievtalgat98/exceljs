import { Module } from '@nestjs/common';
import { ExcelController } from './excel/excel.controller';
import { ExcelModule } from './excel/excel.module';
import { ExcelService } from './excel/excel.service';

@Module({
  imports: [ExcelModule],
  controllers: [ExcelController],
  providers: [ExcelService],
})
export class AppModule {}
