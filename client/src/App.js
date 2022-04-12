import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Login from './components/login/Login'
import Signup from './components/register/Signup';



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
    </BrowserRouter>
  );
}

export default App;