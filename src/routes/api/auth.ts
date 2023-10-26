import { Router } from 'express';
import {
  validateRegister,
  validateLogin
} from '../../middleware/validation/auth';
import { createUser, authUser } from '../../controllers/auth';
import { expressFilterRequest } from '../../middleware';

const router = Router();

const allowedKeys = {
  post: ['name', 'email', 'password']
};

router
  .post(
    '/register',
    validateRegister,
    expressFilterRequest(allowedKeys),
    createUser
  )
  .post('/login', validateLogin, expressFilterRequest(allowedKeys), authUser);

export default router;
