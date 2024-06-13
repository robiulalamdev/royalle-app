import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

const HeightMarker = ({ currentValue }) => (
  <View className="mt-[25px]">
    <View className="bg-[#52C3BE] w-[20px] h-[20px] rounded-full ml-[12px]" />
    <Text className="text-white font-normal text-[12px] leading-[20px] text-center ml-[12px]">
      {currentValue}
    </Text>
  </View>
);

export default function LocationInput({
  locationType,
  setLocationType,
  locationValue,
  setLocationValue,
}) {
  const [range, setRange] = useState([0, 6]);

  const handleValuesChange = (values) => {
    setRange(values);
    setLocationValue(values[1]);
  };
  return (
    <View className="mt-[20px]">
      <View className="flex-row justify-between">
        <Text className="text-white text-[16px] font-medium leading-[24px]">
          Location{" "}
          <Text className="text-[#FFFFFFB2] text-[12px] leading-[20px]">
            ({locationType})
          </Text>
        </Text>
        {locationType === "km" ? (
          <Pressable onPress={() => setLocationType("ml")}>
            <Image
              source={require("../../assets/icons/filter/locationMl.png")}
              className="w-[24px] h-[24px]"
            />
          </Pressable>
        ) : (
          <Pressable onPress={() => setLocationType("km")}>
            <Image
              source={require("../../assets/icons/filter/locationSearch.png")}
              className="w-[24px] h-[24px]"
            />
          </Pressable>
        )}
      </View>
      {locationType === "km" ? (
        <View className="mt-[12px]">
          <TextInput
            onChangeText={setLocationValue}
            value={locationValue}
            placeholder="Search"
            className="text-white text-[12px] placeholder:!text-white h-[44px] border-[1px] border-[#FFFFFF66] rounded-[16px] px-[12px] w-full"
            placeholderTextColor="#FFFFFFB2"
          />
        </View>
      ) : (
        <MultiSlider
          enabledOne={false}
          enabledTwo={true}
          values={range}
          onValuesChange={handleValuesChange}
          min={0}
          max={15}
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
