import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import PrivateRoute from "../../routes/privateRoute";

export default function AppLayout() {
  return (
    <PrivateRoute>
      <Stack
        initialRouteName="index"
        screenOptions={{
          headerShown: false,
        }}
        options={{
          headerShown: false,
        }}
      >
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
        <Stack.Screen
          name="profile/index"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </PrivateRoute>
  );
}
