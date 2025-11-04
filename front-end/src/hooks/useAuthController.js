// front-end/src/hooks/useAuthController.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

export const useAuthController = () => {
  const [pegid, setPegid] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const user = await login(pegid, password);
      console.log('Logged in user:', user);

      // Redirect berdasarkan role (asumsi role: 'admin' atau 'user')
      if (user.role === 1) {
        navigate('/dashboard/manage-attendance');
      } else {
        navigate('/dashboard/attendance-history');
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError(err.message || 'PEGID atau password salah');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return {
    pegid, setPegid,
    password, setPassword,
    showPassword, toggleShowPassword,
    isLoading, error,
    handleLogin,
  };
};