import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function BottomTab({ currentTab = "Home" }) {
  const router = useRouter();
  return (
    <View className="px-[16px] w-full">
      <View
        className="min-h-[82px] w-full rounded-[100px] flex-row justify-between items-center px-[28px]"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.12)" }}
      >
        <Pressable
          onPress={() => router.push("(main)")}
          className={`w-[50px] h-[50px] flex-row justify-center items-center rounded-full ${
            currentTab === "Home" ? "bg-[#52C3BE1C]" : "bg-[#FFFFFF0A]"
          }`}
        >
          {currentTab === "Home" ? (
            <Image
              source={require("../../assets/icons/home/tabs/homeFilled.png")}
              className="w-[25px] h-[25px]"
            />
          ) : (
            <Image
              source={require("../../assets/icons/home/tabs/home.png")}
              className="w-[25px] h-[25px]"
            />
          )}
        </Pressable>
        <Pressable
          onPress={() => router.push("message")}
          className={`w-[50px] h-[50px] flex-row justify-center items-center rounded-full ${
            currentTab === "Message" ? "bg-[#52C3BE1C]" : "bg-[#FFFFFF0A]"
          }`}
        >
          {currentTab === "Message" ? (
            <Image
              source={require("../../assets/icons/home/tabs/messageFilled.png")}
              className="w-[25px] h-[25px]"
            />
          ) : (
            <Image
              source={require("../../assets/icons/home/tabs/message.png")}
              className="w-[25px] h-[25px]"
            />
          )}
        </Pressable>
        <Pressable
          onPress={() => router.push("bot")}
          className={`w-[50px] h-[50px] flex-row justify-center items-center rounded-full ${
            currentTab === "Bot" ? "bg-[#52C3BE1C]" : "bg-[#FFFFFF0A]"
          }`}
        >
          <Image
            source={require("../../assets/icons/home/tabs/bot.png")}
            className="w-[25px] h-[25px]"
          />
        </Pressable>
      </View>
    </View>
  );
}
