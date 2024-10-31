import {createContext, useContext, useEffect, useState} from "react";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";

interface AuthProps {
  authState?: {
    token: string | null;
    authenticated: boolean | null;
  };
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

type AuthState = AuthProps['authState'];

const TOKEN_KEY = 'my_token';
export const API_URL = 'http://localhost:3000/api';
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    authenticated: null
  })

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);

      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

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
    }
    loadToken();
  }, []);

  const register = async (email: string, password: string) => {
    try {
      return await axios.post(`${API_URL}/usuarios`, { email, password })
    } catch (e) {
      console.log(e);
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth`, {
        "email": email,
        "password": password
      })

      setAuthState({
        token: response.data.token,
        authenticated: true
      });

      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      await SecureStore.setItemAsync(TOKEN_KEY, response.data.token);

      return response;
    } catch (e) {
      console.log(e);
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

  return <AuthContext.Provider value={value}>{ children }</AuthContext.Provider>
}