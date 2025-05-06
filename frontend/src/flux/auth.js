let isAuthenticated = false;
let userRole = null;

export const login = (credentials) => {
  // Simulate an API call for authentication
  if (credentials.username === 'admin' && credentials.password === 'admin') {
    isAuthenticated = true;
    userRole = 'admin';
  } else if (credentials.username === 'user' && credentials.password === 'user') {
    isAuthenticated = true;
    userRole = 'user';
  } else {
    isAuthenticated = false;
    userRole = null;
  }
  return isAuthenticated;
};

export const logout = () => {
  isAuthenticated = false;
  userRole = null;
};

export const isAuthenticatedUser = () => isAuthenticated;

export const getUserRole = () => userRole;