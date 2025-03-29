import * as fs from 'fs';
import * as path from 'path';
import { query } from './db.js';

interface MigrationRow {
  name: string;
}

// Ensure migrations table exists
export async function ensureMigrationsTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS migrations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

// ... rest of the code stays the same ... 