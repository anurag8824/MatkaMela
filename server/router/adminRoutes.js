import express from 'express';
import { adminDashboardData, AdminLogin, approveDeposits, approveWithdraws, declareResultList, editGame, getAdminDetails, getAllBetsGameLoad, GetAllUsers, GetQr, GetUPI, toggleUserState, UpdateQr, UpdateUPI, updateWallet, winningReportList } from '../contollers/Admin.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { qrMulter } from '../middlewares/qrMulter.js';


const router = express.Router();



router.post('/login', AdminLogin);
router.get('/admin-detail', authMiddleware , getAdminDetails)

router.get('/admin-dashboard-data', authMiddleware , adminDashboardData )


router.get('/get-users', authMiddleware , GetAllUsers)
router.post('/admin-update-wallet', authMiddleware , updateWallet)
router.post('/toggle-user-state', authMiddleware , toggleUserState )



router.get('/get-game-load', authMiddleware , getAllBetsGameLoad)

router.get('/declare-result-list', authMiddleware , declareResultList)
router.get('/winning-report-list', authMiddleware , winningReportList)




router.post('/edit-game', authMiddleware , editGame)



router.post("/upload-qr", authMiddleware , qrMulter.single("qrImage"), UpdateQr);

router.post("/update-upi-id", authMiddleware , UpdateUPI);
router.get("/get-upi-id", authMiddleware , GetUPI);





router.get("/get-qr", authMiddleware , GetQr);

router.post('/approve-deposits', authMiddleware , approveDeposits)
router.post('/approve-withdraws', authMiddleware , approveWithdraws)



router.get('/me', authMiddleware, (req, res) => {
  res.json({
    message: 'Access granted to protected route',
    user: req.user,
  });
});













export default router;
