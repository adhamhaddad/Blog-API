import { PoolClient } from 'pg';
import { pgClient } from '../database';
import { PostType } from '../types/post';

class Post {
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
  async createPost(user_id: number, p: PostType): Promise<PostType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: `
            INSERT INTO posts (title, content, created_by)
            VALUES ($1, $2, $3)
            RETURNING id, title, content, created_by
            `,
        values: [p.title.trim(), p.content.trim(), user_id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async getPosts(): Promise<PostType[]> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: `
            SELECT DISTINCT p.uuid, p.title, p.created_at, p.updated_at
            FROM posts p
            LEFT JOIN users u WHERE u.id
        `
      };
      const result = await connection.query(query);
      return result.rows;
    });
  }
  async getPostById(id: string): Promise<PostType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: `
            SELECT DISTINCT p.uuid, p.title, p.content, p.created_at, p.updated_at
            FROM posts p
            LEFT JOIN users u WHERE u.id = p.created_by
            WHERE p.uuid=$1
            LIMIT 1
        `,
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async updatePost(
    id: string,
    user_id: number,
    p: PostType
  ): Promise<PostType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: `
            UPDATE posts SET title=$3, content=$4, updated_at=CURRENT_TIMESTAMP
            WHERE uuid=$1 AND created_by$2
            RETURNING *
        `,
        values: [id, user_id, p.title, p.content]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async deletePost(id: string, user_id: number): Promise<PostType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'DELETE FROM posts WHERE uuid=$1 AND created_by=$2 RETURNING uuid',
        values: [id, user_id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
}
export default Post;
