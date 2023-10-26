import { Router } from 'express';
import { auth, users, posts } from './api';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/posts', posts);

export default router;
