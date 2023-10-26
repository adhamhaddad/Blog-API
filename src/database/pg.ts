import { Pool, PoolClient } from 'pg';
import configs from '../config';

const pool = new Pool({
  host: configs.database.host,
  port: configs.database.port,
  database: configs.database.name,
  user: configs.database.user,
  password: configs.database.password
});

pool.on('connect', () => {
  console.log('Connected to Postgres.');
});

pool.on('error', (error) => {
  console.error('Error connecting to Postgres:', error);
});

export default {
  connect: async (): Promise<PoolClient> => {
    const client = await pool.connect();
    return client;
  }
};
