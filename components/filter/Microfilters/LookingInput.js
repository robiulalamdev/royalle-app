import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SelectButton from "./SelectButton";

const tabs = ["Long term", "Short term", "Time pass", "Dating"];

export default function LookingInput({ value, setSelect }) {
  return (
    <View className="mt-[16px]">
      <Text className="text-[16px] font-medium text-white leading-[24px] mb-[12px]">
        Looking for
      </Text>
      <SelectButton tabs={tabs} selectedTab={value} setTab={setSelect} />
    </View>
  );
}
