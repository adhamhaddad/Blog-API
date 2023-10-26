import { Request, Response } from 'express';
import Post from '../../models/post';

const post = new Post();

export const getPostById = async (req: Request, res: Response) => {
  try {
    const response = await post.getPostById(req.params.id);
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
