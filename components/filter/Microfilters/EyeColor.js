import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ColorSelect from "./ColorSelect";
const colors = ["#FFFFFF", "#222222", "#505050", "#A37042", "#06004F"];

export default function EyeColor({ eyeColor, setEyeColor }) {
  return (
    <View>
      <Text className="text-[16px] font-medium text-white leading-[24px] mb-[12px]">
        Eye Color
      </Text>
      <View className="ml-[12px]">
        <ColorSelect
          colors={colors}
          selectedColor={eyeColor}
          setColor={setEyeColor}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
