import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

/**
 * Hook untuk mengakses AuthContext
 * @returns {{
 * user: object | null,
 * login: (pegid, password) => Promise<object>,
 * logout: () => void,
 * loading: boolean,
 * isAuthenticated: boolean
 * }}
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth harus digunakan di dalam AuthProvider');
  }
  return context;
};

