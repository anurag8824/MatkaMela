import express from 'express';
import { AdminLogin, approveDeposits, editGame, getAdminDetails, GetQr, UpdateQr } from '../contollers/Admin.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { qrMulter } from '../middlewares/qrMulter.js';


const router = express.Router();



router.post('/login', AdminLogin);
router.get('/admin-detail', authMiddleware , getAdminDetails)

router.post('/edit-game', authMiddleware , editGame)



router.post("/upload-qr", authMiddleware , qrMulter.single("qrImage"), UpdateQr);
router.get("/get-qr", authMiddleware , GetQr);

router.post('/approve-deposits', authMiddleware , approveDeposits)


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
