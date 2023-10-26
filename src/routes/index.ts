import { Router } from 'express';
import { users } from './api';

const router = Router();

router.use('/users', users);

export default router;
