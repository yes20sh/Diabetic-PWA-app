import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Optionally store user info
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const res = await fetch('https://sweet-track-api.onrender.com/api/auth/check', {
          credentials: 'include', // Important for cookie-based JWT
        });
        if (!isMounted) return;

        if (res.ok) {
          const data = await res.json();
          setIsAuthenticated(true);
          setUser(data.user || null);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (err) {
        if (isMounted) {
          setIsAuthenticated(false);
          setUser(null);
        }
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
    <AuthContext.Provider value={{
      isAuthenticated,
      loading,
      setIsAuthenticated,
      user,
      setUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
