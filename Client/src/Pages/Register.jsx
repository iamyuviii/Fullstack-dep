import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;
    try {
      const response = await axios.post('/register', {
        name, email, password
      });
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setData({ name: '', email: '', password: '' });
        toast.success('Registration Successful');
        navigate('/login');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error('Registration Failed');
      }
    }
  };

  return (
    <div className='new'>
      <form onSubmit={registerUser}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="Enter Name"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
