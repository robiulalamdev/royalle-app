import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import EyeColor from "./Microfilters/EyeColor";
import HairColor from "./Microfilters/HairColor";
import LikesInput from "./Microfilters/LikesInput";
import LookingInput from "./Microfilters/LookingInput";
import PreferencesInput from "./Microfilters/PreferencesInput";

export default function Microfilters({
  open,
  setOpen,
  eyeColor,
  setEyeColor,
  hairColor,
  setHairColor,
  likes,
  setLikes,
  looking,
  setLooking,
  preferences,
  setPreferences,
  showArrow = true,
}) {
  const handleSelect = (input) => {
    const itemIndex = preferences.findIndex((sItem) => sItem === input);
    if (itemIndex !== -1) {
      setPreferences(preferences.filter((sItem) => sItem !== input));
    } else {
      setPreferences([...preferences, input]);
    }
  };
  return (
    <View className="mt-[26px]">
      <View
        className={`flex-row justify-between items-center min-h-[40px] mb-[16px] border-b-[1px] ${
          open ? "border-[#FFFFFF4F]" : "border-transparent"
        }`}
      >
        <Text className="text-white text-[18px] font-semibold leading-[28px]">
          Set Microfilters
        </Text>
        {open && showArrow ? (
          <Pressable
            onPress={() => setOpen(false)}
            className="w-[32px] h-[32px] flex-row justify-center items-center"
          >
            <Image
              source={require("../../assets/icons/filter/CaretDown.png")}
              className="w-[24px] h-[24px]"
            />
          </Pressable>
        ) : (
          <Pressable onPress={() => setOpen(true)}>
            <Image
              source={require("../../assets/icons/filter/filter.png")}
              className="w-[32px] h-[32px]"
            />
          </Pressable>
        )}
      </View>
      {open && (
        <View className="ml-[8px]">
          <EyeColor eyeColor={eyeColor} setEyeColor={setEyeColor} />
          <HairColor hairColor={hairColor} setHairColor={setHairColor} />
          <LikesInput likes={likes} setSelectLikes={setLikes} />
          <LookingInput value={looking} setSelect={setLooking} />
          <PreferencesInput values={preferences} handleSelect={handleSelect} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
