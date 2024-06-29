import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import SelectButton from "./SelectButton";

const tabs = ["Drinking", "Smoking", "Education", "Outlook"];

export default function PreferencesInput({ values, handleSelect }) {
  return (
    <View className="mt-[16px]">
      <Text className="text-[16px] font-medium text-white leading-[24px] mb-[12px]">
        Preferences
      </Text>
      <View className="flex-row flex-wrap gap-[12px] ml-[12px]">
        {tabs.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => handleSelect(item)}
            className={`px-[10px] py-[6px] rounded-[28px] border-[1px] ${
              values.includes(item)
                ? "bg-primary border-primary"
                : "bg-transparent border-[#FFFFFF66]"
            }`}
          >
            <Text
              className={`${
                values.includes(item)
                  ? "text-[#010404] text-[12px] font-medium leading-[20px]"
                  : "text-[12px] font-normal leading-[20px] text-[#FFFFFFCC]"
              }`}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
