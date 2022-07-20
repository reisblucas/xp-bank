const removeTZ = (date: Date) => date.toISOString().split('T')[0];

const Dplus2 = (): string => {
  const twoDaysInMS = 48 * 60 * 60 * 1000; // 48h
  const orderWillBeExecutedAt = new Date(Math
    .floor(Date.now() + twoDaysInMS));

  return removeTZ(orderWillBeExecutedAt);
};

const dateSeparatorOptions: Record<string, string> = {
  '/': '/',
  '-': '-',
  '|': '|',
  '+': '+',
  '.': '.',
  ',': ',',
};

const dateFormatLiterals: Record<string, () => number> = {
  'dmy': () =>,
}

const changer = (date: string) => {
  Object.keys(dateSeparatorOptions);
  date.split('')
}

// const changeFormat = (date: string, format: string, options?: string) => {
//   // dd/mm/yyyy -> yyyy-mm-dd
//   dateFormatLiterals[format]
// }

const newDateMethods = {
  removeTZ,
  Dplus2,
};

export default newDateMethods;
