// route.js
import React, { useState } from "react";
import { Stack } from "expo-router";
import {
  useMyFeedsQuery,
  useMyInfoQuery,
} from "../redux/features/user/userApi";

const Route = () => {
  useMyInfoQuery();

  return (
    <>
      <Stack
        initialRouteName="(main)"
        screenOptions={{
          headerShown: false,
        }}
        options={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="(main)"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
};

export default Route;
