import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import Layout from './Components/Layout';
// import ShopPage from './Pages/Ecom/ShopPage';
import ManageUsers from './Pages/ManageUsers';
import ManageResult from './Pages/ManageResult';
import ManageStarlineResult from './Pages/ManageStarlineResult';
import ManageGuess from './Pages/ManageGuess';
import ManageBets from './Pages/ManageBets';
import ManageGames from './Pages/ManageGames';
import Transactions from './Pages/Transactions';
import ReportPage from './Pages/ReportPage';
import ManageWinners from './Pages/ManageWinners';
import ManagePayments from './Pages/ManagePayments';
import Settings from './Pages/Settings';
import Refresh from './Pages/Refresh';
import PasswordReset from './Pages/PasswordReset';
import EditResult from './Pages/EditResult';
import Login from './Pages/Account/Login';
import DepositHistory from './Pages/DepositHistory';
import QrUploadForm from './Pages/QrUploadForm';
import EditGame from './Pages/EditGame';
import InactiveUsers from './Pages/InactiveUsers';
import TodayUsers from './Pages/TodayUsers';
import WithdrawHistory from './Pages/WithdrawHistory';


const basePath = "public/administrator"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={`/${basePath}`} replace />} />
        <Route path={basePath} element={<Layout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<HomePage />} />
          <Route path="user/active-user-list" element={<ManageUsers />} />
          <Route path="user/inactive-user-list" element={<InactiveUsers />} />
          <Route path="user/today-user-list" element={<TodayUsers />} />


          
          <Route path="result/update-number" element={<ManageResult />} />
          <Route path="edit-result/:id/:name" element={<EditResult />} />
          <Route path="login" element={<Login />} />
          <Route path="manage_starline" element={<ManageStarlineResult />} />
          <Route path="manage_guess" element={<ManageGuess />} />
          <Route path="bets" element={<ManageBets />} />
          <Route path="game/game-name-list" element={<ManageGames />} />
          <Route path="game/edit-game/:id" element={<EditGame />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="report" element={<ReportPage />} />
          <Route path="winner" element={<ManageWinners />} />
          <Route path="payment" element={<ManagePayments />} />
          <Route path="settings" element={<Settings />} />
          <Route path="refresh" element={<Refresh />} />
          <Route path="reset_password" element={<PasswordReset />} />
          <Route path="deposit/:type" element={<DepositHistory />} />
          <Route path="withdraw/:type" element={<WithdrawHistory />} />

          <Route path="upload-qr" element={<QrUploadForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
