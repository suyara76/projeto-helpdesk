import { api } from './api'; 

//defining the structures that the form will use
interface LoginData {
  email: string;
  password?: string;
}

interface RegisterData {
  name: string;
  lastName: string;
  email: string;
  password?: string;
}

export const authService = {
  login: async (data: LoginData) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },
  
  register: async (data: RegisterData) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },
};