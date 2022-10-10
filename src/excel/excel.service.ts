import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Workbook } from 'exceljs';

import * as tmp from 'tmp';
let data = [
  {
    name: 'sherry',
    email: 'sherry@gmail.com',
  },
  {
    name: 'ali',
    email: 'ali@gmail.com',
  },
  {
    name: 'omer',
    email: 'omer@gmail.com',
  },
];
@Injectable()
export class ExcelService {
  async downloadExcel() {
    if (!data) {
      throw new NotFoundException('No data to download');
    }

    const rows = [];
    data.forEach((doc) => {
      rows.push(Object.values(doc));
    });

    const book = new Workbook();

    const sheet = book.addWorksheet('sheet1');

    rows.unshift(Object.keys(data[0]));

    sheet.addRows(rows);

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
          book.xlsx
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
    data = excelDoc;
    return data;
  }
}
