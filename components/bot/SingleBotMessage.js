import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";

export default function SingleBotMessage({ data = null }) {
  const router = useRouter();

  return (
    <View>
      <View className="w-full">
        {data?.isBot ? (
          <View className="flex-row items-end gap-x-[12px] mt-[24px]">
            <Image
              source={require("../../assets/icons/bot/botProfile.png")}
              className="w-[40px] h-[40px] rounded-full"
              resizeMode="cover"
            />
            <View className="bg-primary px-[16px] py-[12px] rounded-[24px_24px_24px_0px] max-w-[75%]">
              <Text
                className="text-[#010101] text-[14px] leading-[20px] font-normal"
                style={{ fontFamily: "Poppins-Regular" }}
              >
                {data?.message}
              </Text>
            </View>
          </View>
        ) : (
          <View className="w-[100%] flex-row justify-end mt-[24px]">
            <View className="bg-[#FFFFFF1F] px-[16px] py-[12px] rounded-[24px_24px_0px_24px] max-w-[75%]">
              <Text
                className="text-white text-[14px] leading-[20px] font-normal"
                style={{ fontFamily: "Poppins-Regular" }}
              >
                {data?.message}
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
