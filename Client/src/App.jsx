import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../src/Compo/Navbar';
import Home from '../src/Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import { UserContextProvider } from '../context/userContext';
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true
function App() {
  return (
    <UserContextProvider>
      <Navbar />
      <Toaster position='top-bottom' toastOptions={{ duration: 2000 }}></Toaster>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Login' element={<Login />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
