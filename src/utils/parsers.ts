const jsonSimple = (s: string) => JSON.parse(s) as unknown;

const parsers = {
  jsonSimple,
};

export { jsonSimple, parsers };
