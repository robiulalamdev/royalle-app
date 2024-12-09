import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";

const ProfileScreen = () => {
  return (
    <SafeAreaView className="bg-black h-full flex-1 px-[20px] ">
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default ProfileScreen;
