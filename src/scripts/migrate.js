#!/usr/bin/env node
import { program } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import migrations from '../lib/migrations.cjs';
const { runMigrations, undoLastMigration, undoAllMigrations } = migrations;
program
  .version('1.0.0')
  .description('Database migration CLI tool');

program
  .command('create <name>')
  .description('Create a new migration')
  .action((name) => {
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
    const migrationName = `${timestamp}_${name}`;
    const migrationsDir = path.join(process.cwd(), 'src/migrations');

    if (!fs.existsSync(migrationsDir)) {
      fs.mkdirSync(migrationsDir, { recursive: true });
    }

    // Create up migration
    const upFilePath = path.join(migrationsDir, `${migrationName}.up.sql`);
    fs.writeFileSync(upFilePath, '-- Add migration up SQL here\n');

    // Create down migration
    const downFilePath = path.join(migrationsDir, `${migrationName}.down.sql`);
    fs.writeFileSync(downFilePath, '-- Add migration down SQL here\n');

    console.log(`Created migration files:`);
    console.log(`  ${upFilePath}`);
    console.log(`  ${downFilePath}`);
  });

program
  .command('up')
  .description('Run all pending migrations')
  .action(async () => {
    try {
      await runMigrations();
    } catch (error) {
      console.error('Migration failed:', error);
      process.exit(1);
    }
  });

program
  .command('down')
  .description('Revert the most recent migration')
  .action(async () => {
    try {
      await undoLastMigration();
    } catch (error) {
      console.error('Migration revert failed:', error);
      process.exit(1);
    }
  });

program
  .command('reset')
  .description('Revert all migrations')
  .action(async () => {
    try {
      await undoAllMigrations();
    } catch (error) {
      console.error('Migration reset failed:', error);
      process.exit(1);
    }
  });

program.parse(process.argv); 