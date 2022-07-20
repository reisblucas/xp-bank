const dateSeparatorOptions: Record <number, string> = {
  0: '/',
  1: '-',
  2: '|',
  3: '+',
  4: '.',
  5: ',',
};

const order: Record<string, number> = {
  d: 0,
  m: 1,
  y: 2,
};

const formatter = (dateSplitted: string[], newFormat: string, options = '/'): string => newFormat
  .split('')
  .reduce((prev, crr, i) => {
    if (i < 2 && options) {
      return prev.concat(`${dateSplitted[order[crr]]}${options}`);
    }
    return prev.concat(`${dateSplitted[order[crr]]}`);
  }, '');

const formatDecimalPlaces = (dataSplitted: string[]): string[] => dataSplitted.map((field) => {
  const doesNotHaveZeroAtInitial = field[0] !== '0';
  const fieldIsLesserThan10 = (+field < 10);
  return fieldIsLesserThan10 && doesNotHaveZeroAtInitial ? `0${field}` : field;
});

const changeFormat = (date: string, newFormat: string, options?: string): string => {
  const objSeparatorLength = Object.keys(dateSeparatorOptions);
  const invalid = 'Invalid Date';

  let theUserOptionExists = '/';
  let dateSplitted: string | string[] = '';
  const objLastPostion = objSeparatorLength.length;
  for (let i = 0; i < objSeparatorLength.length; i += 1) {
    // the split only occurs when dateSeparatorOption exists in the base
    const isSplited = date.split(dateSeparatorOptions[i]);
    if (isSplited.length === 3) {
      theUserOptionExists = dateSeparatorOptions[i];
      dateSplitted = isSplited;
      break;
    }

    if (i === (objLastPostion - 1)) dateSplitted = invalid;
  }

  if (dateSplitted === invalid) {
    console.log('Error: Invalid date');
    return dateSplitted;
  }

  if (!theUserOptionExists) {
    console.log('Error: Invalid format option');
    return theUserOptionExists;
  }

  const castDateSplitted = dateSplitted as string[];
  const placesFormatted = formatDecimalPlaces(castDateSplitted);
  return dateSplitted && formatter(placesFormatted, newFormat, options);
};

export default changeFormat;
