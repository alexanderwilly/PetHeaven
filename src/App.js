import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import GuestPage from './view/guest/GuestPage';
import Login from './view/guest/Login';
import AboutUs from './view/guest/AboutUs';
import Adoption from './view/guest/Adoption';
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
          </Routes>
          <ToastContainer />
        </div>
      </Router>
    </>
  );
}

export default App;
