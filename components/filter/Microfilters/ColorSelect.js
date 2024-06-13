import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function ColorSelect({
  colors = [],
  selectedColor = "",
  setColor,
}) {
  return (
    <View className="flex-row gap-[20px]">
      {colors.map((item, index) => (
        <View key={index}>
          {selectedColor === item ? (
            <View
              className={`w-[28px] h-[28px] rounded-full flex-row justify-center items-center`}
              style={{ backgroundColor: item }}
            >
              <View
                className={`w-[24px] h-[24px] rounded-full border-[2px] border-black`}
                style={{ backgroundColor: item }}
              ></View>
            </View>
          ) : (
            <Pressable onPress={() => setColor(item)}>
              <View
                className={`w-[28px] h-[28px] rounded-full`}
                style={{ backgroundColor: item }}
              ></View>
            </Pressable>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({});
