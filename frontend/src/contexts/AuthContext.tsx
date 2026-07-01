import { createContext, useState, ReactNode } from 'react';

export const AuthContext = createContext({} as any);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null);

  const login = async (credentials: any) => {
    // Chama o authService, guarda o token no localStorage e seta o usuário
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
}