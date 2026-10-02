import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService, DEMO_ROLES } from '../services/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => authService.getCurrentUser());

  const switchRole = (roleKeyOrName) => {
    const user = authService.loginWithRole(roleKeyOrName);
    setCurrentUser(user);
    return user;
  };

  const logout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  const loginAs = (role) => {
    return switchRole(role);
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      switchRole,
      loginAs,
      logout,
      isAdmin: currentUser?.roleKey === 'admin',
      isTeacher: currentUser?.roleKey === 'teacher',
      isParent: currentUser?.roleKey === 'parent',
      isStudent: currentUser?.roleKey === 'student',
      roles: DEMO_ROLES
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
