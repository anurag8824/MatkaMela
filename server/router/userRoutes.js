import express from 'express';
import { AddBankDetails, AddMoney, ApplicationForm , BetGameCopyPaste, BetGameCrossing, BetGameHarraf, BetGameJodi, BetGameManual, CalculateGameResults, GetAllGame, GetBankDetails, getDepositList, getUserBetHistory, getUserInfo, getWithdrawList, MSMEForm, SendOTP, UserDeposit, UserLogin, UserRegister, UserShop, UserWithdraw } from '../contollers/User.controller.js';
import upload from '../middlewares/upload.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Define fields for file uploads
const fileFields = [
  { name: 'profileImage' },
  { name: 'aadharFrontImage' },
  { name: 'aadharBackImage' },
  { name: 'panCardImage' },
  { name: 'tenthMarksheetImage' },
  { name: 'twelthMarksheetImage' },
  { name: 'postGraduateImage' },
  { name: 'graduateImage' },
  { name: 'bankCheque' },
  { name: 'technicalCertification' },
  { name: 'academicCertification' }
];

// ✅ API Route
router.post('/submit-form', upload.fields(fileFields), ApplicationForm);

router.post('/msme-submit', upload.single('file'), MSMEForm);

const buyFileFields = [
  { name: 'aadharCard' },
  { name: 'passportPhoto' }
];

router.post('/user-buy', authMiddleware, upload.fields(buyFileFields), UserShop);

router.get('/get-games',  GetAllGame);

router.post('/bet-game-jodi', authMiddleware,  BetGameJodi);
router.post('/bet-game-manual',authMiddleware,  BetGameManual);
router.post('/bet-game-harraf',authMiddleware,  BetGameHarraf);
router.post('/bet-game-crossing',authMiddleware,  BetGameCrossing);
router.post('/bet-game-copypaste', authMiddleware, BetGameCopyPaste);

router.post('/add-points', authMiddleware, AddMoney);

router.post('/add-bank-detail', authMiddleware, AddBankDetails);
router.get('/get-bank-detail', authMiddleware, GetBankDetails);




router.post('/user-deposit', authMiddleware, UserDeposit);
router.post('/user-withdraw', authMiddleware, UserWithdraw);


router.get('/user-deposit-list', authMiddleware, getDepositList);
router.get('/user-withdraw-list', authMiddleware, getWithdrawList);







router.get('/getUserInfo', authMiddleware, getUserInfo);

router.get('/bet-game-history', authMiddleware, getUserBetHistory);



router.post('/bet-game-result', authMiddleware ,  CalculateGameResults);










router.post('/register', upload.single('image'), UserRegister);

router.post('/send-otp', SendOTP);

router.post('/login', UserLogin);

router.get('/me', authMiddleware, (req, res) => {
  res.json({
    message: 'Access granted to protected route',
    user: req.user,
  });
});




export default router;
