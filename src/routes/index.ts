import { Router } from 'express';
import { users, posts } from './api';

const router = Router();

router.use('/users', users);
router.use('/posts', posts);

export default router;
