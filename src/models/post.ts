import { PoolClient } from 'pg';
import { pgClient } from '../database';
import { PostType } from '../types/post';
import { PostResponseType } from '../types/posts-response';

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
  async createPost(user_id: number, p: PostType): Promise<PostResponseType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: `
          INSERT INTO posts (title, content, created_by)
          VALUES ($1, $2, $3)
          RETURNING
          uuid, title, content, created_at, updated_at,
          (SELECT u.uuid
            FROM users u
            WHERE u.id = $3) AS "user_uuid",
          (SELECT u.name
            FROM users u
            WHERE u.id = $3) AS "name",
          (SELECT u.email
            FROM users u
            WHERE u.id = $3) AS "email"
        `,
        values: [p.title.trim(), p.content.trim(), user_id]
      };
      const result = await connection.query(query);
      return {
        id: result.rows[0].uuid,
        title: result.rows[0].title,
        content: result.rows[0].content,
        createdBy: {
          id: result.rows[0].user_uuid,
          name: result.rows[0].name,
          email: result.rows[0].email
        },
        createdAt: result.rows[0].created_at,
        updatedAt: result.rows[0].updated_at
      };
    });
  }
  async getPosts(): Promise<PostResponseType[]> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: `
            SELECT p.uuid, p.title, p.content, p.created_at, p.updated_at,
            u.uuid AS user_uuid, u.name, u.email
            FROM posts p
            LEFT JOIN users u ON u.id = p.created_by
        `
      };
      const result = await connection.query(query);
      return result.rows.map((row) => ({
        id: row.uuid,
        title: row.title,
        content: row.content,
        createdBy: { id: row.user_uuid, name: row.name, email: row.email },
        createdAt: row.created_at,
        updatedAt: row.updated_at
      }));
    });
  }
  async getPostById(id: string): Promise<PostResponseType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: `
            SELECT p.uuid, p.title, p.content, p.created_at, p.updated_at,
            u.uuid AS user_uuid, u.name, u.email
            FROM posts p
            LEFT JOIN users u ON u.id = p.created_by
            WHERE p.uuid=$1
            LIMIT 1
        `,
        values: [id]
      };
      const result = await connection.query(query);

      if (!result.rows[0]) return result.rows[0];
      return {
        id: result.rows[0].uuid,
        title: result.rows[0].title,
        content: result.rows[0].content,
        createdBy: {
          id: result.rows[0].user_uuid,
          name: result.rows[0].name,
          email: result.rows[0].email
        },
        createdAt: result.rows[0].created_at,
        updatedAt: result.rows[0].updated_at
      };
    });
  }
  async updatePost(
    id: string,
    user_id: number,
    p: PostType
  ): Promise<PostResponseType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: `
          UPDATE posts AS p
          SET title = $3, content = $4, updated_at = CURRENT_TIMESTAMP
          FROM users AS u
          WHERE p.uuid = $1 AND p.created_by = $2 AND u.id = p.created_by
          RETURNING p.uuid, p.title, p.content, p.created_at, p.updated_at, u.uuid AS user_uuid, u.name, u.email
        `,
        values: [id, user_id, p.title, p.content]
      };
      const result = await connection.query(query);
      return {
        id: result.rows[0].uuid,
        title: result.rows[0].title,
        content: result.rows[0].content,
        createdBy: {
          id: result.rows[0].user_uuid,
          name: result.rows[0].name,
          email: result.rows[0].email
        },
        createdAt: result.rows[0].created_at,
        updatedAt: result.rows[0].updated_at
      };
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
