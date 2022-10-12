import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ExcelController } from './excel.controller';
import { ExcelModel } from './excel.models';
import { ExcelService } from './excel.service';

@Module({
  controllers: [ExcelController],
  providers: [ExcelService],
  imports: [SequelizeModule.forFeature([ExcelModel])],
  exports: [ExcelService],
})
export class ExcelModule {}
