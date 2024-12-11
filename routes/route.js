// route.js
import React, { useState } from "react";
import { Stack } from "expo-router";
import { useSelector } from "react-redux";

const Route = () => {
  // const { user } = useSelector((state) => state.user);

  // console.log(user);

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
