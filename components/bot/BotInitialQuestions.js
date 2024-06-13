import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { botAssistantQuestions } from "../../constants/data";

export default function BotInitialQuestions({ handleInitialQna }) {
  return (
    <View className="flex-row flex-wrap gap-[12px] mt-[24px] mb-[12px]">
      {botAssistantQuestions.map((item, index) => (
        <Pressable
          onPress={() => handleInitialQna(item)}
          key={index}
          className="bg-[#FFFFFF14] rounded-[24px] py-[12px] px-[16px] flex-row items-center gap-x-[6px]"
        >
          <Text className="font-normal text-[12px] text-white leading-[20px]">
            {item?.question}
          </Text>
          <Image source={item.icon} className="w-[16px] h-[16px]" />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({});
