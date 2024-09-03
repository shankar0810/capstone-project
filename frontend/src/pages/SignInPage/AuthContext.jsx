import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext();
const SESSION_TIMEOUT = 15 * 60 * 1000; // 15 minutes

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    loading: true,
  });

  const logout = useCallback((message) => {
    setAuth({ isAuthenticated: false, user: null });
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('lastActivity');
    sessionStorage.removeItem('sessionActive');
    if (message) {
      toast.info(message);
    }
  }, []);

  const startInactivityTimer = useCallback(() => {
    const timer = setTimeout(() => {
      logout('Session expired due to inactivity');
    }, SESSION_TIMEOUT);
    return timer;
  }, [logout]);

  const checkAuthStatus = useCallback(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const lastActivity = localStorage.getItem('lastActivity');
    const sessionActive = sessionStorage.getItem('sessionActive');

    if (token && userId && sessionActive) {
      const currentTime = new Date().getTime();
      if (lastActivity && currentTime - parseInt(lastActivity, 10) > SESSION_TIMEOUT) {
        logout('Session expired');
      } else {
        setAuth({ isAuthenticated: true, user: { userId }, loading: false });
        return startInactivityTimer();
      }
    } else {
      logout();
    }
    return null;
  }, [logout, startInactivityTimer]);

  useEffect(() => {
    let inactivityTimer = checkAuthStatus();

    const handleActivity = () => {
      localStorage.setItem('lastActivity', new Date().getTime().toString());
      clearTimeout(inactivityTimer);
      inactivityTimer = startInactivityTimer();
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        inactivityTimer = checkAuthStatus();
      }
    };

    const handleStorageChange = (e) => {
      if (e.key === 'token' && e.newValue === null) {
        logout('You have been logged out');
      }
    };

    window.addEventListener('click', handleActivity);
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keypress', handleActivity);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keypress', handleActivity);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('storage', handleStorageChange);
      clearTimeout(inactivityTimer);
    };
  }, [checkAuthStatus, logout, startInactivityTimer]);

  const login = useCallback((user) => {
    setAuth({ isAuthenticated: true, user });
    localStorage.setItem('token', user.token);
    localStorage.setItem('userId', user.userId);
    localStorage.setItem('lastActivity', new Date().getTime().toString());
    sessionStorage.setItem('sessionActive', 'true');
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);