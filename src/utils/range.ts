const calcInterval = (n: number, m: number) => Math.abs(n - (m));

const range = (n: number, m: number): number[] => {
  const loopQuantity = calcInterval(n, m);
  console.log(loopQuantity);

  // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
  let _initial = 0;
  const arr = [];
  for (let i = 1; i <= loopQuantity; i += 1) {
    arr.push(i);
    _initial += 1;
  }

  return arr;
};

export default range;
