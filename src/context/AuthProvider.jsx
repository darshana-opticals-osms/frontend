import { useState } from 'react';
import AuthContext from './AuthContext';
import authService from '../services/auth/authService';

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authService.getCurrentUser());
  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = Boolean(user && authService.isAuthenticated());

  async function register(registrationData) {
    setIsLoading(true);

    try {
      return await authService.register(registrationData);
    } finally {
      setIsLoading(false);
    }
  }

  async function login(credentials) {
    setIsLoading(true);

    try {
      const authenticatedUser = await authService.login(credentials);
      setUser(authenticatedUser);

      return authenticatedUser;
    } finally {
      setIsLoading(false);
    }
  }

  function logout() {
    authService.logout();
    setUser(null);
  }

  const value = {
    user,
    isAuthenticated,
    isLoading,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
