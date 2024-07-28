import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      initialRouteName="login"
      options={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="bumble"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="tinder"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
