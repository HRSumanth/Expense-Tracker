import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialState = localStorage.getItem('token');
  const expiration = localStorage.getItem('expiration');

  const [token, setToken] = useState(initialState);

  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);

    localStorage.setItem('token', token);
    const expirationTime = new Date().getTime() + 50 * 60 * 1000;
    localStorage.setItem('expiration', expirationTime);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  };

  useEffect(() => {
    const checkAuthTimeout = () => {
      const expirationTime = localStorage.getItem('expiration');
      const currentTime = new Date().getTime();
     
      if (expirationTime && currentTime > expirationTime) {
        
        logoutHandler();
      }
    };

    const interval = setInterval(checkAuthTimeout, 1000); 

    return () => clearInterval(interval); 
  }, []);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
