import { Router } from 'express';
import {
  validateCreatePost,
  validateGetPost,
  validateUpdatePost,
  validateDeletePost
} from '../../middleware/validation/posts';
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost
} from '../../controllers/posts';
import { verifyToken, expressFilterRequest } from '../../middleware';

const allowedKeys = {
  post: ['title', 'content'],
  patch: ['title', 'content']
};

const router = Router();

router
  .post(
    '/',
    validateCreatePost,
    verifyToken,
    expressFilterRequest(allowedKeys),
    createPost
  )
  .get('/', verifyToken, getPosts)
  .get('/:id', validateGetPost, verifyToken, getPostById)
  .patch(
    '/:id',
    validateUpdatePost,
    verifyToken,
    expressFilterRequest(allowedKeys),
    updatePost
  )
  .delete('/:id', validateDeletePost, verifyToken, deletePost);

export default router;
