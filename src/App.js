import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import GuestPage from './view/guest/GuestPage.js';
import Login from './view/guest/Login.js';
import AboutUs from './view/guest/AboutUs.js';
import Adoption from './view/guest/Adoption.js';
import Volunteer from './view/guest/Volunteer.js';
import ContactUs from './view/guest/ContactUs.js';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Routes>
            <Route path='/PetHeaven' element={<GuestPage />} />
            <Route path='/PetHeaven/login' element={<Login />} />
            <Route path='/PetHeaven/about-us' element={<AboutUs />} />
            <Route path='/PetHeaven/adoption' element={<Adoption />} />
            <Route path='/PetHeaven/contact-us' element={<ContactUs />} />
            <Route path='/PetHeaven/volunteer' element={<Volunteer />} />
          </Routes>
          <ToastContainer />
        </div>
      </Router>
    </>
  );
}

export default App;
