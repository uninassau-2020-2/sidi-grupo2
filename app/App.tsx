import React, { useEffect } from "react";
import { Platform } from "react-native";
import * as Updates from "expo-updates";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { AuthProvider } from "./src/context/auth.context";
import Routes from "./src/routes/";
import { store } from "./src/services/store";

export default function App() {
  useEffect(() => {
    async function updateApp() {
      const { isAvailable } = await Updates.checkForUpdateAsync();
      if (isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    }
    Platform.OS !== "web" && !__DEV__ && updateApp();
  }, []);

  return (
    <NavigationContainer>
      <Provider store={store}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </Provider>
    </NavigationContainer>
  );
}
