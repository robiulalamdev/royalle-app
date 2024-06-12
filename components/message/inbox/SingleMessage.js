import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function SingleMessage({ data = null, chat = null }) {
  return (
    <View className="w-full">
      {data?.user?.id === 1 ? (
        <View className="flex-row items-end gap-x-[12px] mt-[24px]">
          <Image
            source={chat?.user?.image}
            className="w-[40px] h-[40px] rounded-full"
            resizeMode="cover"
          />
          <View className="bg-primary px-[16px] py-[12px] rounded-[24px_24px_24px_0px] max-w-[75%]">
            <Text
              className="text-[#010101] text-[14px] leading-[20px] font-normal"
              style={{ fontFamily: "PoppinsRegular" }}
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
              style={{ fontFamily: "PoppinsRegular" }}
            >
              {data?.message}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
