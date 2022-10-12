import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Workbook } from 'exceljs';

import * as tmp from 'tmp';
import { ExcelModel } from './excel.models';
import { excelRow } from './utils/excelrow';
import { mergeCells } from './utils/mergeCells';

@Injectable()
export class ExcelService {
  constructor(
    @InjectModel(ExcelModel) private excelModels: typeof ExcelModel,
  ) {}

  async findOne(id: number) {
    const role = await this.excelModels.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException('dfg');
    }
    return role;
  }

  async downloadExcel(id: number) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('My Sheet', {
      pageSetup: { paperSize: 9, orientation: 'landscape' },
    });
    const excelData = await this.excelModels.findOne({
      where: { id },
    });
    worksheet.getColumn(1).width = 14;
    worksheet.getRow(1).height = 30;

    worksheet.mergeCells(`A1:Z1`);

    mergeCells(worksheet, 5, 8, 'B', 'U');
    mergeCells(worksheet, 9, 13, 'A', 'L');
    mergeCells(worksheet, 9, 12, 'N', 'R');
    mergeCells(worksheet, 9, 12, 'S', 'V');
    mergeCells(worksheet, 15, 27, 'B', 'W');

    worksheet.getCell(
      'A1',
    ).value = ` Автономная некоммерческая организация высшего образования "Университет Иннополис":`;
    worksheet.getCell('A5').value = `Профиль:`;
    worksheet.getCell('A6').value = `Кафедра:`;
    worksheet.getCell('A7').value = `Факультет:`;

    worksheet.getCell('B5').value = excelData.profile;
    worksheet.getCell('B6').value = excelData.department;
    worksheet.getCell('B7').value = excelData.faculty;

    worksheet.getCell('A9').value = `Квалификация: ${excelData.qualification}`;
    worksheet.getCell('A11').value = `Форма обучения: ${excelData.formStudy}`;
    worksheet.getCell(
      'A12',
    ).value = `Срок получения образования: ${excelData.educationTerm}`;

    worksheet.getCell(
      'N9',
    ).value = `Год начала подготовки (по учебному плану):`;
    worksheet.getCell('N10').value = `Учебный год:`;
    worksheet.getCell('N11').value = `Образовательный стандарт (ФГОС):`;

    worksheet.getCell('A15').value = 'Код';
    worksheet.getCell('B15').value =
      'Области профессиональной деятельности и (или) сферы профессиональной деятельности. Профессиональные стандарты';
    excelRow(worksheet, excelData.directions);

    const File = await new Promise((resolve) => {
      tmp.file(
        {
          discardDescriptor: true,
          prefix: 'MyExcelSheet',
          postfix: '.xlsx',
          mode: parseInt('0600', 8),
        },
        async (err, file) => {
          if (err) {
            throw new BadRequestException(err);
          }
          workbook.xlsx
            .writeFile(file)
            .then(() => {
              resolve(file);
            })
            .catch((err) => {
              throw new BadRequestException(err);
            });
        },
      );
    });
    return File;
  }

  async excelDoc(excelDoc) {
    const user = await this.excelModels.create(excelDoc);
    return user;
  }
}
