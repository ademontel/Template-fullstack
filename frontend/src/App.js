import React, { useState } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import Login from './components/Login';
import { isAuthenticatedUser, login, logout } from './flux/auth';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(isAuthenticatedUser());

  const handleLogin = (credentials) => {
    if (login(credentials)) {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
  };

  return (
    <div className="container mt-5">
      {isAuthenticated ? (
        <>
          <h1>User CRUD HOLA</h1>
          <button onClick={handleLogout}>Logout</button>
          <UserForm />
          <UserList />
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;