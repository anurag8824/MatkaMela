import express from 'express';
import { AdminLogin, getAdminDetails } from '../contollers/Admin.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';


const router = express.Router();



router.post('/login', AdminLogin);
router.get('/admin-detail', authMiddleware , getAdminDetails)

router.get('/me', authMiddleware, (req, res) => {
  res.json({
    message: 'Access granted to protected route',
    user: req.user,
  });
});








router.get('/me', authMiddleware, (req, res) => {
  res.json({
    message: 'Access granted to protected route',
    user: req.user,
  });
});





export default router;
