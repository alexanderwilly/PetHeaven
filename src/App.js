import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GuestPage from './view/guest/GuestPage';

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Routes>
            <Route path='/' element={<GuestPage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
