import { useState } from 'react';
import { sumar, restar, multiplicar, dividir } from '../utils/math';
import { insertOperacion } from '../db/operations';


type Operation = 'sumar' | 'restar' | 'multiplicar' | 'dividir';

export const useCalculator = () => {
  const [a, setA] = useState<string>('');
  const [b, setB] = useState<string>('');
  const [resultado, setResultado] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const parseNumbers = () => {
    const numA = Number(a);
    const numB = Number(b);

    if (isNaN(numA) || isNaN(numB)) {
      throw new Error('Ingrese números válidos');
    }

    return { numA, numB };
  };

  const operar = (operation: Operation) => {
    try {
      setError(null);
      const { numA, numB } = parseNumbers();

      const res =
        operation === 'sumar' ? sumar(numA, numB) :
        operation === 'restar' ? restar(numA, numB) :
        operation === 'multiplicar' ? multiplicar(numA, numB) :
        dividir(numA, numB);

       // insertOperacion(numA, numB, operation, res);
      setResultado(res);
      

    } catch (e: any) {
      setResultado(null);
      setError(e.message);
    }
  };

  return {
    a,
    b,
    resultado,
    error,
    setA,
    setB,
    operar,
  };
};
