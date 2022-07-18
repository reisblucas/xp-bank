const serialize = (date: string) => (new Date(date)).toLocaleDateString('sv'); // yyyy/mm/dd

const birthDate = {
  serialize,
  // validate birth-date func
};

export default birthDate;
