import { Response } from 'express';
import { Request } from '../../middleware';
import User from '../../models/user';

const user = new User();

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user_id: string = req.user?.uuid as unknown as string;
    const response = await user.updateUser(user_id, req.body);
    res.status(203).json({ data: response });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
