import { createClient } from 'libsql';

    const db = createClient({
      url: 'file:users.db',
    });

    export async function initDb() {
      await db.execute(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL
        )
      `);
    }

    export async function registerUser(username, password) {
      try {
        await db.execute({
          sql: 'INSERT INTO users (username, password) VALUES (:username, :password)',
          args: { username, password },
        });
        return true;
      } catch (error) {
        console.error('Errore durante la registrazione:', error);
        return false;
      }
    }


    export async function loginUser(username, password) {
      try {
        const result = await db.execute({
          sql: 'SELECT * FROM users WHERE username = :username AND password = :password',
          args: { username, password }
        });
        return result.rows.length > 0;
      } catch (error) {
        console.error('Errore durante il login:', error);
        return false;
      }
    }

    export default db;
