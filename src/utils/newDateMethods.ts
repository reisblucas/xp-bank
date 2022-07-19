const formatter = (date: Date) => date.toISOString().split('T')[0];

const Dplus2 = (): string => {
  const twoDaysInMS = 48 * 60 * 60 * 1000; // 48h
  const orderWillBeExecutedAt = new Date(Math
    .floor(Date.now() + twoDaysInMS));

  return formatter(orderWillBeExecutedAt);
};

const newDateMethods = {
  formatter,
  Dplus2,
};

export default newDateMethods;
