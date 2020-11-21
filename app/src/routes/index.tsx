import React from "react";
import { View, ActivityIndicator } from "react-native";

import { useAuth } from "../context/auth.context";

import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";

const Routes: React.FC = () => {
  const { isSignedIn, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#666" />
      </View>
    );
  }

  return isSignedIn ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
