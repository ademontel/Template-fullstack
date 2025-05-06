let isAuthenticated = false;
let userRole = null;

const API_URL = 'http://localhost:8000';

export const login = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) {
      throw new Error('Error al obtener usuarios');
    }
    const users = await response.json();
    
    // Buscar un usuario que coincida con las credenciales
    const user = users.find(u => 
      u.name === credentials.username && 
      u.password === credentials.password
    );

    if (user) {
      isAuthenticated = true;
      userRole = 'user'; // Por ahora todos son usuarios normales
      return true;
    } else {
      isAuthenticated = false;
      userRole = null;
      return false;
    }
  } catch (error) {
    console.error('Error durante el login:', error);
    isAuthenticated = false;
    userRole = null;
    return false;
  }
};

export const logout = () => {
  isAuthenticated = false;
  userRole = null;
};

export const isAuthenticatedUser = () => isAuthenticated;

export const getUserRole = () => userRole;