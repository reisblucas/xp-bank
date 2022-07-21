import changeFormat from './dateChangeFormat';

const removeTZ = (date: Date): string => date.toISOString().split('T')[0];

const Dplus2 = (): string => {
  const twoDaysInMS = 48 * 60 * 60 * 1000; // 48h
  const orderWillBeExecutedAt = new Date(Math
    .floor(Date.now() + twoDaysInMS));

  return removeTZ(orderWillBeExecutedAt);
};

const newDateMethods = {
  removeTZ,
  Dplus2,
  changeFormat,
};

export default newDateMethods;
