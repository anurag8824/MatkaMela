import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ContactPage from './Pages/ContactPage';
import HomePage from './Pages/HomePage';
import Layout from './Components/Layout';
import ProductPage from './Pages/ProductPage';
import NewsPage from './Pages/NewsPage';
import GalleryPage from './Pages/GalleryPage';
import AboutPage from './Pages/AboutPage';
import Kendra from './Pages/Kendra';
import Foundation from './Pages/Foundation';
import Group from './Pages/Group';
import Education from './Pages/Education';
import WorkingTeam from './Pages/WorkingTeam';
import WorkingTraining from './Pages/WorkingTraining';
import WorkingScheme from './Pages/WorkingScheme';
import WorkingBusiness from './Pages/WorkingBusiness';
import MSME from './Pages/MSME';
import ShopPage from './Pages/Ecom/ShopPage';
import Register from './Pages/Account/Register';
import Login from './Pages/Account/Login';
import PlayPage from './Pages/PlayGame/PlayPage';
import Wallet from './Pages/Wallet/Wallet';
import HelpPage from './Pages/Wallet/HelpPage';
import PlayMenu from './Pages/PlayMenu';
import History from './Pages/History';
import Productpage from './Productpage';
import Tnc from './Pages/Tnc';
import AppDetails from './Pages/AppDetails';
import Share from './Pages/Share';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="play-game/:id" element={<PlayPage />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="help" element={<HelpPage />} />
          <Route path="play" element={<PlayMenu />} />
          <Route path="history" element={<History />} />
          <Route path="login" element={<Login />} />
          <Route path="Termsandcondition" element={<Tnc />} />
          <Route path="Appdetails" element={<AppDetails />} />
          <Route path="share" element={<Share />} />



          {/* <Route path="product" element={<Productpage />} />  */}


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
