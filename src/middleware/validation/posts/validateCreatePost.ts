import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { validate } from '../validationResult';

export const validateCreatePost = [
  body('title')
    .exists()
    .withMessage('Title is missing from the body.')
    .notEmpty()
    .withMessage('Title is empty')
    .isString()
    .isLength({ min: 2, max: 50 })
    .withMessage('Title must be at least 2 and maximum 50 letters'),
  body('content')
    .exists()
    .withMessage('Title is missing from the body.')
    .notEmpty()
    .withMessage('Title is empty')
    .isString()
    .isLength({ min: 5, max: 2000 })
    .withMessage('Title must be at least 2 and maximum 2000 letters'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
