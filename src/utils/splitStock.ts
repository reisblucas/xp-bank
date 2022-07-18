const tickerSplitter = (stock: string): string[] => stock
  .split(', ').map((stockClass) => stockClass);

export default tickerSplitter;
