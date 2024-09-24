import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Correct named import
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);
  const navigate = useNavigate();

  useEffect(() => {
    if (authToken) {
      setUser(jwtDecode(authToken));
    }
  }, [authToken]);

const loginUser = async (email, password) => {
  try {
    const response = await fetch('https://blog-app-1-9dqy.onrender.com/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      setAuthToken(data.access);
      setUser(jwtDecode(data.access));
      localStorage.setItem('authToken', data.access);
      navigate('/posts');
    } else {
      throw new Error(data.message || 'Login failed');
    }
  } catch (error) {
    console.error("Error logging in:", error);
  }
};

  const logoutUser = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, authToken, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
