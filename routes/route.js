// route.js
import React, { useState } from "react";
import { Stack } from "expo-router";
import { useSelector } from "react-redux";

const Route = () => {
  const { user } = useSelector((state) => state.nonPersisted.user);
  // const user = null || { _id: 1, name: "username", email: "email.com" };

  return (
    <>
      {user ? (
        <Stack
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
        </Stack>
      ) : (
        <>
          <Stack
            initialRouteName="index"
            screenOptions={{
              headerShown: false, // Apply globally to all screens under this Stack
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
              name="(auth)"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        </>
      )}
    </>
  );
};

export default Route;
