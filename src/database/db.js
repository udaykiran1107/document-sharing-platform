import sqlite3 from 'sqlite3';
import { config } from '../config/config.js';
import path from 'path';
import fs from 'fs';

// Ensure data directory exists
const dataDir = path.dirname(config.databasePath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Create database connection
const db = new sqlite3.Database(config.databasePath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Enable foreign keys
db.run('PRAGMA foreign_keys = ON');

// Initialize database schema
export const initializeDatabase = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Create shares table
      db.run(`
        CREATE TABLE IF NOT EXISTS shares (
          id TEXT PRIMARY KEY,
          share_id TEXT UNIQUE NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          expires_at DATETIME
        )
      `, (err) => {
        if (err) {
          console.error('Error creating shares table:', err.message);
          reject(err);
        }
      });

      // Create files table
      db.run(`
        CREATE TABLE IF NOT EXISTS files (
          id TEXT PRIMARY KEY,
          share_id TEXT NOT NULL,
          original_name TEXT NOT NULL,
          stored_name TEXT NOT NULL,
          mime_type TEXT NOT NULL,
          size INTEGER NOT NULL,
          upload_date DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (share_id) REFERENCES shares(share_id)
        )
      `, (err) => {
        if (err) {
          console.error('Error creating files table:', err.message);
          reject(err);
        } else {
          console.log('Database schema initialized');
          resolve();
        }
      });
    });
  });
};

// Helper function to run queries with promises
export const runQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID, changes: this.changes });
      }
    });
  });
};

// Helper function to get a single row
export const getOne = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

// Helper function to get multiple rows
export const getAll = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

export default db;
