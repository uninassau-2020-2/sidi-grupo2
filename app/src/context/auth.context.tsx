import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import * as auth from "../services/auth";
import api from "../services/api";

export interface IUser {
  id: number;
  username: string;
  role: string;
  token: string;
}

interface AuthContextData {
  signed: boolean;
  user: IUser | null;
  loading: boolean;
  error: string | null;
  signIn(username: string, password: string): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = await AsyncStorage.getItem("@RNAuth:user");
      const storagedToken = await AsyncStorage.getItem("@RNAuth:token");

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));

        api.defaults.headers.auth = storagedToken;
        setError(null);
      }

      setLoading(false);
    }

    loadStorageData();
  });

  async function signIn(username: string, password: string) {
    try {
      const response = await auth.signIn(username, password);
      setUser(response.user);
      api.defaults.headers.auth = response.token;

      await AsyncStorage.setItem("@RNAuth:user", JSON.stringify(response.user));
      await AsyncStorage.setItem("@RNAuth:token", response.token);
    } catch (e) {
      setError("Usuário inválido");
    }
  }

  async function signOut() {
    await AsyncStorage.clear();
    setUser(null);
    setError(null);
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, error, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}

export { AuthProvider, useAuth };
