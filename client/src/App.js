import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './components/login/Login'
import Signup from './components/signup/Signup';



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
           <Route path="/" element={<Navigate replace to="/login" />} />
           <Route path="/login" element={<Login />} />
           <Route path="/signup" element={<Signup />} />           
        </Routes>
      </div>
      <ToastContainer />
    </BrowserRouter>
    );
}

export default App;