const { writeFile, readdir } = require('fs/promises');
const commander = require('commander');

const sqlMigration = (migrationName) => `\
INSERT INTO public.${migrationName} () VALUES
();
`

const generateMigrationName = async () => {
  commander
    .version('1.0.0', '-v, --version')
    .option('-t, --table <value>', 'Table name for which the migration is being created')
    .parse(process.argv);

  const { table } = commander?.opts();

  if (!table) {
    throw new Error('Migration name was not provided');
  }

  const migrationName = `${Date.now()}-${table}.sql`;
  const dirs = await readdir('migrations');

  if (dirs.includes(migrationName)) {
    return [`${migrationName}-copy`, table];
  }

  return [migrationName, table];
}

const createMigration = async () => {
  try {
    const [migrationName, table] = await generateMigrationName();

    await writeFile(`migrations/${migrationName}`, sqlMigration(table));
  } catch (error) {
    console.error('Migration creation error: ', error)
  }
}

(async () => await createMigration())();
