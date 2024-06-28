import React from "react";
import { Stack } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../redux/store";

const Layout = () => {
  const [fontsLoaded] = useFonts({ PoppinsRegular: Poppins_400Regular });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <View>
            <Text>Loading...</Text>
          </View>
        }
        persistor={persistor}
      >
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="message/index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="message/[chatId]"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="bot/index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="filter/index"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </PersistGate>
    </Provider>
  );
};

export default Layout;
