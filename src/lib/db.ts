import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create a connection pool to MySQL
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'onboarding_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Function to get a connection from the pool
export async function getConnection() {
  return await pool.getConnection();
}

// Function to execute a query and automatically handle connection
export async function query(sql: string, params: any[] = []) {
  console.log('Executing query:', sql, params);
  const connection = await pool.getConnection();
  try {
    const [results] = await connection.execute(sql, params);
    return results;
  } finally {
    connection.release();
  }
}

// Export the pool for direct access if needed
export { pool };