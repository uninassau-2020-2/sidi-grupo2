import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { User } from "../interface";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../services/store/createStore";
import { signInSuccess } from "../services/store/ducks/auth/actions";

interface AuthContextData {
  isSignedIn: boolean;
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const { isSignedIn, user, loadingSignInRequest } = useSelector(
    (state: StoreState) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = await AsyncStorage.getItem("@auth:user");
      const storagedToken = await AsyncStorage.getItem("@auth:token");
      const user: User = JSON.parse(storagedUser || "") as User;

      if (storagedToken && user) {
        console.log("teste");
        dispatch(signInSuccess({ token: storagedToken, user: user }));
      }
    }

    loadStorageData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isSignedIn, user, loading: loadingSignInRequest }}
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
