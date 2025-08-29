import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import Layout from './Components/Layout';
import Login from './Pages/Account/Login';
import PlayPage from './Pages/PlayGame/PlayPage';
import Wallet from './Pages/Wallet/Wallet';
import HelpPage from './Pages/Wallet/HelpPage';
import History from './Pages/History';
import Tnc from './Pages/Tnc';
import AppDetails from './Pages/AppDetails';
import Share from './Pages/Share';
import Deposit from './Pages/Wallet/Deposit';
import AddBank from './Pages/Wallet/AddBank';
import HomePlayMenu from './Pages/HomePlayMenu';
import ReferPage from './Pages/Account/ReferPage';
import Register from './Pages/Account/Register';
import ReferList from './Pages/ReferList';
import ResultHistory from './Pages/ResultHistory';
import EditProfile from './Pages/Account/EditProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="play-game/:id" element={<PlayPage />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="add-bank" element={<AddBank />} />

          <Route path="help" element={<HelpPage />} />
          <Route path="play" element={<HomePlayMenu />} />
          <Route path="history" element={<History />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
<Route path="Profile" element={<EditProfile />} />
          <Route path="refercode" element={<ReferPage />} />
          <Route path="refer-list" element={<ReferList />} />
          <Route path="result-history" element={<ResultHistory />} />




          <Route path="Termsandcondition" element={<Tnc />} />
          <Route path="Appdetails" element={<AppDetails />} />
          <Route path="share" element={<Share />} />
          <Route path="deposit/:money" element={<Deposit />} />




          {/* <Route path="product" element={<Productpage />} />  */}


{/* <Route path="product" element={<ProductPage />} /> */}

          {/* <Route path="contact" element={<ContactPage />} />

          <Route path="register" element={<Register />} />
          


          
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
