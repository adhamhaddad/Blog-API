import { Request, Response } from 'express';
import Post from '../../models/post';

const post = new Post();

export const getPosts = async (req: Request, res: Response) => {
  try {
    const response = await post.getPosts();
    res.status(200).json({ data: response, total: response.length });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
