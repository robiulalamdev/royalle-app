import { View, Text } from "react-native";
import React from "react";
import { Slot, Stack } from "expo-router";

const ProfileLayout = () => {
  return (
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
        name="friends"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="friends/[id]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="notifications"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="preference"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="update-profile"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default ProfileLayout;
