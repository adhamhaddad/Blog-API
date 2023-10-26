import { Request, Response } from 'express';
import User from '../../models/user';

const user = new User();

export const getUserById = async (req: Request, res: Response) => {
  try {
    const response = await user.getUserById(req.params.id);
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
