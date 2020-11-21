import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../interface";
import { StoreState } from "../services/store/createStore";
import {
  logoutAction,
  signInSuccess,
} from "../services/store/ducks/auth/actions";

interface AuthContextData {
  isSignedIn: boolean;
  user: User | null;
  loading: boolean;
  signOut: () => void;
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

      if (storagedToken && user) {
        const user: User = JSON.parse(storagedUser || "") as User;
        dispatch(signInSuccess({ token: storagedToken, user: user }));
      }
    }

    loadStorageData();
  }, []);

  function signOut() {
    dispatch(logoutAction());
  }

  return (
    <AuthContext.Provider
      value={{ isSignedIn, user, loading: loadingSignInRequest, signOut }}
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
