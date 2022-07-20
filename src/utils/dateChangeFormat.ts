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

const changer = (date: string, newFormat: string, options?: string): string => {
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

  return dateSplitted && formatter(dateSplitted as string[], newFormat, options);
};

export default changer;
