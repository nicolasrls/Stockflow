import { Router } from 'express';
import { register, login } from '../controllers/authController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);

router.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'This is a protected route!' });
});


export default router;
