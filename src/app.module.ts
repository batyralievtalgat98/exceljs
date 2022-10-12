import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ExcelController } from './excel/excel.controller';
import { ExcelModel } from './excel/excel.models';
import { ExcelModule } from './excel/excel.module';
import { ExcelService } from './excel/excel.service';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '2142',
      database: 'exceljs',
      models: [ExcelModel],
      autoLoadModels: true,
    }),
    ExcelModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
