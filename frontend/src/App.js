import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import Login from './components/Login';
import { isAuthenticatedUser, login, logout } from './flux/auth';
import { addUser } from './flux/actions';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(isAuthenticatedUser());
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    try {
      const success = await login(credentials);
      if (success) {
        setIsAuthenticated(true);
      } else {
        alert('Credenciales inválidas');
      }
    } catch (error) {
      console.error('Error en login:', error);
      alert('Error al intentar iniciar sesión');
    }
  };

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
  };

  const handleRegister = (userData) => {
    const user = {
      name: userData.username,
      email: userData.email,
      password: userData.password
    };
    
    try {
      addUser(user);
      navigate('/');
    } catch (error) {
      alert('Error al registrar usuario: ' + error.message);
    }
  };

  return (
    <div className="container mt-5">
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <>
                <h1>User CRUD HOLA</h1>
                <button onClick={handleLogout}>Logout</button>
                <UserForm />
                <UserList />
              </>
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route path="/register" element={<UserForm onRegister={handleRegister} />} />
      </Routes>
    </div>
  );
}

export default App;