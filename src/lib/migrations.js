const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '123',
  database: process.env.DB_NAME || 'linktree',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Query function
async function query(sql, params) {
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
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

// Get list of applied migrations
export async function getAppliedMigrations() {
  await ensureMigrationsTable();
  const result = await query('SELECT name FROM migrations ORDER BY id DESC');
  return result.map(row => row.name);
}

// Run migrations
export async function runMigrations() {
  const appliedMigrations = await getAppliedMigrations();
  
  // Get all migration files
  const migrationsDir = path.join(process.cwd(), 'src/migrations');
  
  // Create migrations directory if it doesn't exist
  if (!fs.existsSync(migrationsDir)) {
    fs.mkdirSync(migrationsDir, { recursive: true });
  }
  
  const migrationFiles = fs.readdirSync(migrationsDir)
    .filter((file) => file.endsWith('.up.sql'))
    .sort();
  
  // Run pending migrations
  for (const file of migrationFiles) {
    const migrationName = file.replace('.up.sql', '');
    if (!appliedMigrations.includes(migrationName)) {
      console.log(`Running migration: ${migrationName}`);
      
      const migrationContent = fs.readFileSync(
        path.join(migrationsDir, file), 
        'utf8'
      );
      
      try {
        // Execute migration
        await query(migrationContent);
        
        // Record migration
        await query('INSERT INTO migrations (name) VALUES (?)', [migrationName]);
        
        console.log(`Migration ${migrationName} completed successfully`);
      } catch (error) {
        console.error(`Migration ${migrationName} failed:`, error);
        throw error;
      }
    }
  }
  
  console.log('All migrations completed');
}

// Undo the most recent migration
export async function undoLastMigration() {
  const appliedMigrations = await getAppliedMigrations();
  
  if (appliedMigrations.length === 0) {
    console.log('No migrations to undo');
    return;
  }
  
  const lastMigration = appliedMigrations[0];
  const migrationsDir = path.join(process.cwd(), 'src/migrations');
  const downFile = path.join(migrationsDir, `${lastMigration}.down.sql`);
  
  if (!fs.existsSync(downFile)) {
    throw new Error(`Down migration file not found: ${downFile}`);
  }
  
  console.log(`Undoing migration: ${lastMigration}`);
  
  try {
    // Execute down migration
    const downMigrationContent = fs.readFileSync(downFile, 'utf8');
    await query(downMigrationContent);
    
    // Remove migration record
    await query('DELETE FROM migrations WHERE name = ?', [lastMigration]);
    
    console.log(`Migration ${lastMigration} undone successfully`);
  } catch (error) {
    console.error(`Failed to undo migration ${lastMigration}:`, error);
    throw error;
  }
}

// Undo all migrations
export async function undoAllMigrations() {
  const appliedMigrations = await getAppliedMigrations();
  
  if (appliedMigrations.length === 0) {
    console.log('No migrations to undo');
    return;
  }
  
  const migrationsDir = path.join(process.cwd(), 'src/migrations');
  
  for (const migration of appliedMigrations) {
    const downFile = path.join(migrationsDir, `${migration}.down.sql`);
    
    if (!fs.existsSync(downFile)) {
      throw new Error(`Down migration file not found: ${downFile}`);
    }
    
    console.log(`Undoing migration: ${migration}`);
    
    try {
      // Execute down migration
      const downMigrationContent = fs.readFileSync(downFile, 'utf8');
      await query(downMigrationContent);
      
      // Remove migration record
      await query('DELETE FROM migrations WHERE name = ?', [migration]);
      
      console.log(`Migration ${migration} undone successfully`);
    } catch (error) {
      console.error(`Failed to undo migration ${migration}:`, error);
      throw error;
    }
  }
  
  console.log('All migrations undone');
}
