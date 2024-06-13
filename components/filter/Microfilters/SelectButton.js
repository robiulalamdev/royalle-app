import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function SelectButton({ tabs = [], selectedTab, setTab }) {
  return (
    <View className="flex-row flex-wrap gap-[12px] ml-[12px]">
      {tabs.map((item, index) => (
        <Pressable
          key={index}
          onPress={() => setTab(item)}
          className={`px-[10px] py-[6px] rounded-[28px] border-[1px] ${
            selectedTab === item
              ? "bg-primary border-primary"
              : "bg-transparent border-[#FFFFFF66]"
          }`}
        >
          <Text
            className={`${
              selectedTab === item
                ? "text-[#010404] text-[12px] font-medium leading-[20px]"
                : "text-[12px] font-normal leading-[20px] text-[#FFFFFFCC]"
            }`}
          >
            {item}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({});
