import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { email, password } = data;
    try {
      const response = await axios.post('/login', { email, password });
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setData({ email: '', password: '' });
        toast.success('Login Successful');
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Login Failed');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className='new'>
      <form onSubmit={loginUser}>


        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
        />


        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
        />


        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

      </form>
    </div>

  );
}
