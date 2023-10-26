import { Router } from 'express';
import {
  validateGetUser,
  validateUpdateUser
} from '../../middleware/validation/users';
import {
  getUserById,
  getUsers,
  updateUser,
  deleteUser
} from '../../controllers/users';
import { verifyToken, expressFilterRequest } from '../../middleware';

const allowedKeys = {
  patch: ['first_name', 'last_name', 'email']
};

const router = Router();

router
  .get('/', verifyToken, getUsers)
  .get('/:id', validateGetUser, verifyToken, getUserById)
  .patch(
    '/:id',
    validateUpdateUser,
    verifyToken,
    expressFilterRequest(allowedKeys),
    updateUser
  )
  .delete('/:id', verifyToken, deleteUser);

export default router;
