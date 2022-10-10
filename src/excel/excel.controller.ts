import { Body, Controller, Get, Header, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ExcelService } from './excel.service';

@Controller('excel')
export class ExcelController {
  constructor(private excelService: ExcelService) {}

  @Get('/download')
  @Header('Content-Type', 'text/xlsx')
  async downloadReport(@Res() res: Response) {
    const result = await this.excelService.downloadExcel();
    res.download(`${result}`);
  }

  @Post()
  create(@Body() excelDto: any) {
    return this.excelService.excelDoc(excelDto);
  }
}
