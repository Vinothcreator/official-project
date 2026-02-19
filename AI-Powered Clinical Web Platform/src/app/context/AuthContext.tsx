import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'doctor' | 'nurse' | 'patient';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  register: (data: any) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, role: UserRole) => {
    // Mock login - simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Mock user data based on role
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: role === 'doctor' ? 'Dr. Sarah Johnson' : 
            role === 'nurse' ? 'Emily Chen' : 
            'John Smith',
      email,
      role,
      avatar: role === 'doctor' ? 'https://images.unsplash.com/photo-1755189118414-14c8dacdb082?w=150' :
              role === 'nurse' ? 'https://images.unsplash.com/photo-1641723345378-a701b30b2d36?w=150' :
              'https://images.unsplash.com/photo-1758691462126-2ee47c8bf9e7?w=150'
    };
    
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (data: any) => {
    // Mock registration
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: data.fullName,
      email: data.email,
      role: 'patient',
      avatar: 'https://images.unsplash.com/photo-1758691462126-2ee47c8bf9e7?w=150'
    };
    setUser(newUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
