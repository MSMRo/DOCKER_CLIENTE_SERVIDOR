import { db } from './database';

export const initDB = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS operaciones (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        a REAL,
        b REAL,
        operacion TEXT,
        resultado REAL,
        fecha TEXT
      );`
    );
  });
};
