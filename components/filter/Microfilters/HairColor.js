import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ColorSelect from "./ColorSelect";
const colors = ["#FFFFFF", "#222222", "#A37042", "#505050", "#AAABB5"];

export default function HairColor({ hairColor, setHairColor }) {
  return (
    <View className="mt-[16px]">
      <Text className="text-[16px] font-medium text-white leading-[24px] mb-[12px]">
        Hair Color
      </Text>
      <View className="ml-[12px]">
        <ColorSelect
          colors={colors}
          selectedColor={hairColor}
          setColor={setHairColor}
        />
      </View>
    </View>
  );
}
