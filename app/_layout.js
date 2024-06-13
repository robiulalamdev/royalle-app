import React from "react";
import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";

const Layout = () => {
  const [fontsLoaded] = useFonts({ PoppinsRegular: Poppins_400Regular });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }
  return (
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
  );
};

export default Layout;
