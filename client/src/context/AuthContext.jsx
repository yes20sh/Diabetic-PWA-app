import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const res = await fetch('https://sweet-track-api.onrender.com/api/auth/check', {
          credentials: 'include',
        });
        if (isMounted) {
          setIsAuthenticated(res.ok);
        }
      } catch (err) {
        if (isMounted) setIsAuthenticated(false);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
