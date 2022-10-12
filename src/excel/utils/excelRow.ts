export const excelRow = (worksheet, excelData) => {
  let letter = 16;
  excelData.forEach(({ code, nameDirection }) => {
    worksheet.getCell(`A${letter}`).value = code;
    worksheet.getCell(`B${letter}`).value = nameDirection;
    letter++;
  });
};
