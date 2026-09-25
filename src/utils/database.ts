import * as SQLite from 'expo-sqlite';
import * as Crypto from 'expo-crypto';

// Initialize the database synchronously (SDK 56+ syntax)
export const db = SQLite.openDatabaseSync('ecommerce.db');

export function initDatabase() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
  `);
}

// Very basic hash function using expo-crypto for demo purposes
async function hashPassword(password: string): Promise<string> {
  return await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password
  );
}

export async function registerUser(email: string, password: string) {
  try {
    const hashed = await hashPassword(password);
    const result = db.runSync(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, hashed]
    );
    return { success: true, id: result.lastInsertRowId };
  } catch (error: any) {
    if (error.message.includes('UNIQUE constraint failed')) {
      throw new Error('Email already exists');
    }
    throw error;
  }
}

export async function loginUser(email: string, password: string) {
  const hashed = await hashPassword(password);
  const user = db.getFirstSync<{ id: number; email: string }>(
    'SELECT id, email FROM users WHERE email = ? AND password = ?',
    [email, hashed]
  );
  
  if (user) {
    return user;
  }
  throw new Error('Invalid email or password');
}

export function deleteUser(email: string) {
  db.runSync('DELETE FROM users WHERE email = ?', [email]);
}
