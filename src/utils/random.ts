// get in stackoverflow to buy time
const getRandomInt = (min: number, max: number): number => {
  const sMin = Math.ceil(min);
  const sMax = Math.floor(max);
  return Math.floor(Math.random() * (sMax - sMin + 1)) + sMin;
};

export default getRandomInt;
