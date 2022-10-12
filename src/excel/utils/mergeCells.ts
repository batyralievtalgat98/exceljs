export const mergeCells = (
  worksheet,
  startRow,
  endRow,
  firstLetter,
  lastLetter,
) => {
  for (let i = startRow; i < endRow; i++) {
    worksheet.mergeCells(`${firstLetter}${i}:${lastLetter}${i}`);
  }
};
