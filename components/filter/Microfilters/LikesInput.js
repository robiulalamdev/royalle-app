import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SelectButton from "./SelectButton";

const tabs = ["Workout", "Want kids", "Has kid", "Others"];

export default function LikesInput({ likes, setSelectLikes }) {
  return (
    <View className="mt-[16px]">
      <Text className="text-[16px] font-medium text-white leading-[24px] mb-[12px]">
        Likes
      </Text>
      <SelectButton tabs={tabs} selectedTab={likes} setTab={setSelectLikes} />
    </View>
  );
}
