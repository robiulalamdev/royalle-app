import React, { useState } from "react";
import { View, Text } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

const HeightMarker = ({ currentValue }) => (
  <View className="mt-[25px]">
    <View className="bg-[#52C3BE] w-[20px] h-[20px] rounded-full ml-[12px]" />
    <Text className="text-white font-normal text-[12px] leading-[20px] text-center ml-[12px]">
      {currentValue}”
    </Text>
  </View>
);

export default function HeightRange() {
  const [ageRange, setAgeRange] = useState([0, 6]);

  const handleValuesChange = (values) => {
    setAgeRange(values);
  };

  return (
    <View className="w-full mt-[20px]">
      <Text className="text-white text-[16px] font-medium leading-[24px]">
        Height{" "}
        <Text className="text-[#FFFFFFB2] text-[12px] leading-[20px]">(m)</Text>
      </Text>
      <View className="">
        <MultiSlider
          enabledOne={false}
          enabledTwo={true}
          values={ageRange}
          onValuesChange={handleValuesChange}
          min={0}
          max={10}
          step={1}
          selectedStyle={{ backgroundColor: "#52C3BE" }}
          unselectedStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.20)",
            height: 8,
            borderRadius: 16,
            width: "100%",
          }}
          trackStyle={{ height: 8 }}
          isMarkersSeparated={true}
          customMarkerLeft={() => (
            <View className="bg-[#52C3BE] w-[8px] h-[8px] rounded-[16px] ml-[6px] mt-[8px]" />
          )}
          customMarkerRight={(e) => (
            <HeightMarker currentValue={e.currentValue} />
          )}
          sliderLength={335}
        />
      </View>
    </View>
  );
}
