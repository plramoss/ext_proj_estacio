import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import { Alert } from "react-native";

type RegisterParams = {
  nome: string;
  email: string;
  password: string;
}
interface AuthProps {
  authState?: {
    token: string | null;
    authenticated: boolean | null;
  };
  onRegister?: ({ nome, email, password }: RegisterParams) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

type AuthState = AuthProps['authState'];

export const TOKEN_KEY = 'my_token';
export const API_URL = 'http://192.168.1.12:3000/api';
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }: any) => {
  const [ authState, setAuthState ] = useState<AuthState>({
    token: null,
    authenticated: null
  })
  
  useEffect(() => {
    (async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${ token }`;
        
        setAuthState({
          token,
          authenticated: true
        });
      } else {
        setAuthState({
          token: null,
          authenticated: false
        });
      }
    })();
  }, []);
  
  const register = async ({nome, email, password}: RegisterParams) => {
    try {
      await axios.post(`${ API_URL }/auth/cadastro`, { nome, email, password })
      await login(email, password);
    } catch (e) {
      console.log(e);
      // @ts-ignore
      if (e.response && e.response.status === 409) {
        Alert.alert('Erro', 'Usuário já existe. Por favor, tente novamente.');
      }
    }
  }
  
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${ API_URL }/auth/login`, { email, password });
      
      setAuthState({
        token: response.data.token,
        authenticated: true
      });
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${ response.data.token }`;
      await SecureStore.setItemAsync(TOKEN_KEY, response.data.token);
      return response;
    } catch (e) {
      console.log(e);
      // @ts-ignore
      if (e.response && e.response.status === 401) {
        Alert.alert('Erro', 'Email ou senha inválidos');
      }
    }
  }
  
  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    
    axios.defaults.headers.common['Authorization'] = '';
    
    setAuthState({
      token: null,
      authenticated: false
    });
  }
  
  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState
  };
  
  return <AuthContext.Provider value={ value }>{ children }</AuthContext.Provider>
}