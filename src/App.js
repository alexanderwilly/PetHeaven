import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import GuestPage from './view/guest/GuestPage';
import Login from './view/guest/Login';
import Register from './view/guest/Register';
import ResetPassword from './view/guest/ResetPassword';
import AboutUs from './view/guest/AboutUs';
import Adoption from './view/guest/Adoption';
import PetInfo from './view/guest/PetInfo';
import Volunteer from './view/guest/Volunteer';
import Donate from './view/guest/Donate';
import ContactUs from './view/guest/ContactUs';

import Profile from './view/member/Profile';

import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Routes>
            <Route path='/PetHeaven' element={<GuestPage />} />
            <Route path='/PetHeaven/login' element={<Login />} /> 
            <Route path='/PetHeaven/register' element={<Register />} />
            <Route path='/PetHeaven/reset-password' element={<ResetPassword />} />
            <Route path='/PetHeaven/about-us' element={<AboutUs />} />
            <Route path='/PetHeaven/adoption' element={<Adoption />} />
            <Route path = '/PetHeaven/pet-info' element={<PetInfo />} />
            <Route path='/PetHeaven/donate' element={<Donate />} />
            <Route path='/PetHeaven/volunteer' element={<Volunteer />} />
            <Route path='/PetHeaven/contact-us' element={<ContactUs />} />

            <Route path='/PetHeaven/member/profile' element={<Profile />} />
          </Routes>
          <ToastContainer />
        </div>
      </Router>
    </>
  );
}

export default App;
