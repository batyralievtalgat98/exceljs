import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ExcelService } from './excel.service';

@Controller('excel')
export class ExcelController {
  constructor(private excelService: ExcelService) {}

  @Get('/download/:id')
  @Header('Content-Type', 'text/xlsx')
  async downloadReport(@Param('id') id: number, @Res() res: Response) {
    const result = await this.excelService.downloadExcel(+id);
    res.download(`${result}`);
  }

  @Post()
  create(@Body() excelDto: any) {
    return this.excelService.excelDoc(excelDto);
  }
}
