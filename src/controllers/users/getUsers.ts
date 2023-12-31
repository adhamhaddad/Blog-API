import { Response } from 'express';
import { Request } from '../../middleware';
import User from '../../models/user';

const user = new User();

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const response = await user.getUsers();
    res.status(200).json({ data: response, total: response.length });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
