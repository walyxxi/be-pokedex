export const randomBoolean = () => Math.random() < 0.5;

export const fibonacci = (num) => {
  if (num === 0) return 0;
  if (num < 2) return num;
  else return fibonacci(num - 1) + fibonacci(num - 2);
};

export const isPrime = (num) => {
  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
};
