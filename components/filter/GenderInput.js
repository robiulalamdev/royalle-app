import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const tabs = ["Male", "Female", "Others"];

export default function GenderInput({ gender, setGender }) {
  return (
    <View className="mt-[20px]">
      <Text className="text-white text-[16px] font-medium leading-[24px]">
        Gender
      </Text>

      <View className="flex-row gap-[16px] mt-[12px]">
        {tabs.map((item, index) => (
          <Pressable
            onPress={() => setGender(item)}
            className={`px-[20px] py-[8px] rounded-[28px] border-[1px] ${
              gender === item
                ? "bg-primary border-primary"
                : "bg-transparent border-[#FFFFFF66]"
            }`}
          >
            <Text
              className={`${
                gender === item
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
