import changeFormat from './dateChangeFormat';

const removeTZ = (date: Date): string => date.toISOString().split('T')[0];

const Dplus2 = (): string => {
  const twoDaysInMS = 48 * 60 * 60 * 1000; // 48h
  const orderWillBeExecutedAt = new Date(Math
    .floor(Date.now() + twoDaysInMS));

  return removeTZ(orderWillBeExecutedAt);
};

// dd/mm/yyyy -> yyyy/mm/dd
const brFormatToDB = (date: string): string => removeTZ(new Date(changeFormat(date, 'ymd', '-')));

const newDateMethods = {
  removeTZ,
  Dplus2,
  changeFormat,
  brFormatToDB,
};

export default newDateMethods;
