// some date forma provided by user with some of this characters below,
// to use as ref to set newFormat
const dateSeparatorOptions: Record <number, string> = {
  0: '/',
  1: '-',
  2: '|',
  3: '+',
  4: '.',
  5: ',',
  6: ';',
  7: ':',
};

const order: Record<string, number> = {
  d: 0,
  m: 1,
  y: 2,
};

enum YearLength {
  TWO = 2,
  FOUR = 4,
}

const ValidFormat = ['dmy', 'mdy', 'ymd'];

enum InvalidType {
  DATE = 'Invalid Date',
  FORMAT = "Invalid format, try one of: 'dmy', 'mdy' or 'ymd'",
  YEAR = "Year field must be 'yy' or 'yyyy'",
}

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

const validateFormat = (newFormat: string) => {
  const lengthEqualsThree = newFormat.length === 3;
  if (!lengthEqualsThree) return lengthEqualsThree;

  // 'dmy' -> split -> ['d', 'm', 'y'] -> loop(split)
  // -> filter !== d (ex) -> ex ['m', 'y']
  const formatSplitted = newFormat.split('');

  const isValidFormat = formatSplitted
    .map((formatArr) => formatSplitted.filter((opt) => opt === formatArr))
    .some((letterArr) => letterArr.length > 1);

  return isValidFormat;
};

// dd/mm/yyyy only
// [Refactor to insert a other data changes for other formats]
// receive dateSplitted: string[] and works araound that
const validateYearFormat = (dateSplitted: string[]) => {
  // I need to know the yyyy position to make it available in other formats -> add new parameter in principal function
  const yearLen = dateSplitted[2].length;
  return yearLen === YearLength.TWO || yearLen === YearLength.FOUR;
};

const validateDateAfterFormatter = (newFormat: string, formatted: string) => {
  if (newFormat !== 'dmy') {
    const isValidDate = new Date(formatted);
    const validateDate = isValidDate.toString() === InvalidType.FORMAT;
    if (validateDate) {
      return isValidDate.toString();
    }
  }

  return formatted;
};

const changeFormat = (date: string, newFormat: string, options?: string): string => {
  if (!ValidFormat.includes(newFormat)) {
    return InvalidType.FORMAT;
  }

  if (newFormat && validateFormat(newFormat)) {
    return InvalidType.FORMAT;
  }

  const objSeparatorLength = Object.keys(dateSeparatorOptions);
  // const InvalidType.DATE = 'Invalid Date';

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

    if (i === (objLastPostion - 1)) dateSplitted = InvalidType.DATE;
  }

  if (!dateSplitted) {
    console.log('Error: Invalid date');
    return InvalidType.DATE;
  }

  // Year format here
  const isValidYear = validateYearFormat(dateSplitted as string[]);
  if (!isValidYear) {
    return InvalidType.YEAR;
  }

  if (!theUserOptionExists) {
    console.log('Error: Invalid format option');
    return theUserOptionExists;
  }

  const castDateSplitted = dateSplitted as string[];
  const placesFormatted = formatDecimalPlaces(castDateSplitted);
  const formatted = formatter(placesFormatted, newFormat, options);

  return validateDateAfterFormatter(newFormat, formatted);
};

export default changeFormat;

//                           <-- TODOs -->

// 1 - [✅]
// Validate if the field is not repeated 'mmm', 'ddd', '',
// console.log(newDateMethods.changeFormat('30/06/1996', 'mmm'));

// 2 - [✅] -> verification inside
// Reestructure options params to receive another options as object {}
// because actually does not support dd/mm/yyyy as validate new Date fails in validation (?)

// 3 - [ ]
// first param date: date | string
//  if -> date .toString and formatTMZ
//  else -> next step

// 4 - [ ] - Validate field year 'y'
//     [✅] - BR format onny
//     [ ] - Dynamic Format
// year field need to has length of 2 or 4
// if lenght equals to 2 -> does receive 0 in front of it -> avoid this field in function formatter
// else -> next step
