import express from 'express';
import { AddBankDetails, AddMoney, AdminUpdateBetsStatus, ApplicationForm , BetGameCopyPaste, BetGameCrossing, BetGameHarraf, BetGameJodi, BetGameManual, CalculateGameResults, deleteGame, DeleteOldResult, deleteUser, editProfileUser, GetAllGame, GetAllReferredUsersAdmin, GetBankDetails, getCommissions, getDepositList, GetReferredUsers, getUserBetHistory, getUserInfo, getWithdrawList, MSMEForm, payCommission, resultHistory, SendOTP, userAccountStatement, UserDeposit, UserLogin, UserRegister, UserShop, UserWithdraw } from '../contollers/User.controller.js';
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

router.post('/delete-game', authMiddleware ,  deleteGame);

router.post('/delete-user', authMiddleware ,  deleteUser);



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
router.post('/edit-profile', authMiddleware, editProfileUser);


router.get('/bet-game-history', authMiddleware, getUserBetHistory);

router.get('/wallet-history', authMiddleware, userAccountStatement);



router.post('/update-bets-status', authMiddleware , AdminUpdateBetsStatus  );


router.post('/bet-game-result', authMiddleware ,  CalculateGameResults);

router.get('/refer-users', authMiddleware ,  GetReferredUsers);
router.get('/commission-list', authMiddleware ,  GetAllReferredUsersAdmin);



router.get('/game-result-history', authMiddleware, resultHistory);
router.post('/delete-old-result', authMiddleware ,  DeleteOldResult);


router.get('/game-commission', authMiddleware, getCommissions);

router.post('/pay-commission', authMiddleware, payCommission);









router.post('/register', upload.single('image'), UserRegister);

router.post('/send-otp', SendOTP);

router.post('/login', UserLogin);

router.get('/me', authMiddleware, (req, res) => {
  res.json({
   
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        mobile: req.user.mobile,
      },
  });
});




export default router;
