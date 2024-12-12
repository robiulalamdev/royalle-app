import { View, Text, SafeAreaView, Image } from "react-native";
import React, { useCallback } from "react";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable } from "react-native";
import { Assets } from "../../../../lib/assets";

const FriendDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      // dfdf
      return () => {};
    }, [id])
  );

  return (
    <SafeAreaView className="bg-black h-full flex-1 py-[32px]">
      <StatusBar style="light" />
      <View className="flex-row items-center justify-between w-full h-[50px] px-[10px] bg-black">
        <Pressable onPress={() => router.back()}>
          <Image
            source={Assets.Icons.backArrow}
            className="w-[40px] h-[40px]"
          />
        </Pressable>
        <Text className="text-white font-Poppins-Medium leading-[18px]">
          Friends
        </Text>
        <View className="w-[40px] h-[40px]"></View>
      </View>
      <Text>FriendDetails</Text>
    </SafeAreaView>
  );
};

export default FriendDetails;
