import React, { useState } from "react";
import { View, Text } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

const HeightMarker = ({ currentValue }) => {
  const feet = Math.floor(currentValue / 12);
  const inches = currentValue % 12;
  return (
    <View className="mt-[25px]">
      <View className="bg-[#52C3BE] w-[20px] h-[20px] rounded-full ml-[12px]" />
      <Text className="text-white font-normal text-[12px] leading-[20px] text-center ml-[12px]">
        {feet}.{inches}"
      </Text>
    </View>
  );
};

export default function HeightRange() {
  const [heightRange, setHeightRange] = useState([48]); // Initial value is 4 feet (48 inches)

  const handleValuesChange = (values) => {
    setHeightRange(values);
  };

  return (
    <View className="w-full mt-[20px]">
      <Text className="text-white text-[16px] font-medium leading-[24px]">
        Height{" "}
        <Text className="text-[#FFFFFFB2] text-[12px] leading-[20px]">
          (ft - in)
        </Text>
      </Text>
      <View>
        <MultiSlider
          enabledOne={true}
          enabledTwo={false}
          values={heightRange}
          onValuesChange={handleValuesChange}
          min={36} // 3 feet in inches
          max={72} // 6 feet in inches
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
          customMarkerLeft={(e) => (
            <HeightMarker currentValue={e.currentValue} />
          )}
          sliderLength={335}
        />
      </View>
    </View>
  );
}
