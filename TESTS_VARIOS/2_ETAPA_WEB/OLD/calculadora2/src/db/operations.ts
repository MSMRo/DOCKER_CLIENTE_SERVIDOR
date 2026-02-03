import { db } from './database';

export const insertOperacion = (
  a: number,
  b: number,
  operacion: string,
  resultado: number
) => {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO operaciones (a, b, operacion, resultado, fecha)
       VALUES (?, ?, ?, ?, ?)`,
      [a, b, operacion, resultado, new Date().toISOString()]
    );
  });
};
