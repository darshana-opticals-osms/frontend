import { useCallback, useState } from 'react';
import AuthContext from './AuthContext';
import authService from '../services/auth/authService';

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authService.getCurrentUser());
  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = Boolean(user && authService.isAuthenticated());

  const register = useCallback(async (registrationData) => {
    setIsLoading(true);

    try {
      return await authService.register(registrationData);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (credentials) => {
    setIsLoading(true);

    try {
      const authenticatedUser = await authService.login(credentials);
      setUser(authenticatedUser);

      return authenticatedUser;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateUser = useCallback((updatedUser) => {
    const storedUser = authService.updateCurrentUser(updatedUser);
    setUser(storedUser);
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  const value = {
    user,
    isAuthenticated,
    isLoading,
    register,
    login,
    updateUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
