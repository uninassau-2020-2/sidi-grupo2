import * as Updates from "expo-updates";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AuthProvider } from "./src/context/auth.context";
import Routes from "./src/routes/";

export default function App() {
  useEffect(() => {
    async function updateApp() {
      const { isAvailable } = await Updates.checkForUpdateAsync();
      if (isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    }
    updateApp();
  }, []);

  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}
