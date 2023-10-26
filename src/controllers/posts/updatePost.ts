import { Response } from 'express';
import { Request } from '../../middleware';
import Post from '../../models/post';

const post = new Post();

export const updatePost = async (req: Request, res: Response) => {
  try {
    const user_id: number = req.user?.id as unknown as number;
    const response = await post.updatePost(req.params.id, user_id, req.body);
    res.status(203).json({ data: response });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
