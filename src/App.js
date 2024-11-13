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
import Adopt from './view/member/Adopt';
import ReleasePet from './view/member/ReleasePet';
import VolunteerMember from './view/member/VolunteerMember';


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
            <Route path='/PetHeaven/member/adopt' element={<Adopt />} />
            <Route path='/PetHeaven/member/release-pet' element={<ReleasePet />} />
            <Route path='/PetHeaven/member/volunteer' element={<VolunteerMember />} />
          </Routes>
          <ToastContainer />
        </div>
      </Router>
    </>
  );
}

export default App;
