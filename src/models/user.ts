import { PoolClient } from 'pg';
import { pgClient } from '../database';
import { UserType } from '../types/user';
import { hash } from '../utils/password-util';

class User {
  async withConnection<T>(
    callback: (connection: PoolClient) => Promise<T>
  ): Promise<T> {
    const connection = await pgClient.connect();
    try {
      return await callback(connection);
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
  async createUser(u: UserType): Promise<UserType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: `
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3)
            RETURNING id, uuid, name, email
          `,
        values: [u.name.trim(), u.email.trim(), await hash(u.password)]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async getUsers(): Promise<UserType[]> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'SELECT uuid, name, email FROM users'
      };
      const result = await connection.query(query);
      return result.rows;
    });
  }
  async getUserById(id: string): Promise<UserType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'SELECT uuid, name, email FROM users WHERE uuid=$1',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async updateUser(id: string, u: UserType): Promise<UserType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: `
          UPDATE users SET name=$2, updated_at=CURRENT_TIMESTAMP
          WHERE uuid=$1
          RETURNING uuid, name, email
        `,
        values: [id, u.name]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async deleteUser(id: string): Promise<UserType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'DELETE FROM users WHERE uuid=$1 RETURNING uuid',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
}
export default User;
