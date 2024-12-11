import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

const CustomMarker = ({ currentValue }) => (
  <View className="mt-[25px]">
    <View className="bg-[#52C3BE] w-[20px] h-[20px] rounded-full ml-[12px]" />
    <Text className="text-white font-normal text-[12px] leading-[20px] text-center ml-[12px]">
      {currentValue}
    </Text>
  </View>
);

export default function HeightInput({ values, setValues }) {
  const handleValuesChange = (values) => {
    setValues(values);
  };

  return (
    <View className="w-full">
      <Text className="text-white text-[16px] font-medium leading-[24px]">
        Height{" "}
        <Text className="text-[#FFFFFFB2] text-[12px] leading-[20px]">
          (ft - in)
        </Text>
      </Text>
      <View className="">
        <MultiSlider
          values={values}
          onValuesChange={handleValuesChange}
          enabledTwo={false}
          min={3}
          max={9}
          step={1}
          selectedStyle={{ backgroundColor: "#52C3BE" }}
          unselectedStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.20)",
            height: 8,
            borderRadius: 16,
            width: "100%",
          }}
          trackStyle={{ height: 8 }}
          customMarker={(e) => <CustomMarker currentValue={e.currentValue} />}
          sliderLength={335}
        />
      </View>
    </View>
  );
}
