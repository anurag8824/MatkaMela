import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="manage_result" element={<ManageResult />} />
          <Route path="edit-result/:id/:name" element={<EditResult />} />

          <Route path="login" element={<Login />} />

          <Route path="manage_starline" element={<ManageStarlineResult />} />
          <Route path="manage_guess" element={<ManageGuess />} />
          <Route path="bets" element={<ManageBets />} />
          <Route path="manage_games" element={<ManageGames />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="manage_games" element={<ManageGames />} />
          <Route path="report" element={<ReportPage />} />
          <Route path="winner" element={<ManageWinners />} />
          <Route path="payment" element={<ManagePayments />} />
          <Route path="settings" element={<Settings />} />
          <Route path="refresh" element={<Refresh />} />
          <Route path="reset_password" element={<PasswordReset />} />
          











{/* <Route path="product" element={<ProductPage />} /> */}

          {/* <Route path="contact" element={<ContactPage />} />

          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />


          
          <Route path="news" element={<NewsPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="msme" element={<MSME />} />

          <Route path="about" element={<AboutPage />} />
          <Route path="kendra" element={<Kendra />} />
          <Route path="foundation" element={<Foundation />} />
          <Route path="group" element={<Group />} />
          <Route path="education" element={<Education />} />
          <Route path="working-team" element={<WorkingTeam />} />
          <Route path="working-training" element={<WorkingTraining />} />
          <Route path="working-schemes" element={<WorkingScheme />} />
          <Route path="working-business" element={<WorkingBusiness />} />
          <Route path="working-training" element={<WorkingTraining />} />

          <Route path="shopnow/:id" element={<ShopPage />} /> */}





        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
