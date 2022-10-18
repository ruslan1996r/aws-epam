const { readdir, readFile } = require("fs/promises");
const { resolve } = require('path');
const { createClient } = require('../createClient');

/**
 * @param {Array<Object>} existingMigrations 
 * @returns {Array<{ file: string; query: string }>} - file - migration file name; query - sql query string
 */
const getSqlMigrations = async (existingMigrations = []) => {
  const migrationsPath = resolve(__dirname, '..', 'migrations')

  const files = await readdir(migrationsPath)

  const promises = files
    .filter((file) => file.split(".")[1] === "sql")
    .filter((file) => !existingMigrations.includes(file)) // Здесь идёт проверка на то, какие миграции являются новыми
    .map(async (file) => {
      const migrationPath = resolve(__dirname, '../migrations', file)

      return {
        file,
        query: await readFile(migrationPath, { encoding: 'utf-8' })
      }
    })

  const sqlMigrations = await Promise.all(promises);
  const initMigration = sqlMigrations.find(m => m.file === '_init.sql');
  const migrations = sqlMigrations.filter(m => m.file !== '_init');

  return [
    initMigration,
    ...migrations,
  ]
}

const isMigrationsTableExists = async (client) => {
  const response = await client.query("select exists(SELECT * FROM information_schema.tables where table_name = 'migrations')")

  if (response && !response?.rows?.[0].exists) return false;

  return true;
}

const runMigrations = async (client) => {
  try {
    await client.query("BEGIN");

    const migrationsTableExists = await isMigrationsTableExists(client);

    let existingMigrations = { rows: [] }

    if (migrationsTableExists) {
      existingMigrations = await client.query('SELECT * FROM public.migrations;')
    }

    const migrations = await getSqlMigrations(existingMigrations.rows.map(r => r.file))

    for (let migration of migrations) {
      await client.query(migration.query.toString()); // Выполнит миграцию
      await client.query("INSERT INTO migrations (file) VALUES ($1)", [ // Запишет имя миграции в БД
        migration.file,
      ]);
    }

    await client.query("COMMIT");
    console.log('Migration was Success')
  } catch (error) {
    console.log('MIGRATION_ERROR: ', error);
    await client.query("ROLLBACK");
  }
}

(async () => {
  const client = createClient();

  await client.connect();

  await runMigrations(client);

  await client.end()
})()
