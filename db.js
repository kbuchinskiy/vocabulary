import knex from 'knex';

const knexClient = knex({
  client: 'pg',
  connection: {
    user: 'kyrylo',
    host: '127.0.0.1',
    database: 'postgres',
    password: '  11',
    port: 5432,
  }
});

export default knexClient;