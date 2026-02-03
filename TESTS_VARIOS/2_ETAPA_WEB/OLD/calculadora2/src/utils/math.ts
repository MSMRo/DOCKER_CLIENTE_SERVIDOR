export const sumar = (a: number, b: number): number => a + b;

export const restar = (a: number, b: number): number => a - b;

export const multiplicar = (a: number, b: number): number => a * b;

export const dividir = (a: number, b: number): number => {
  if (b === 0) {
    throw new Error('No se puede dividir entre cero');
  }
  return a / b;
};
