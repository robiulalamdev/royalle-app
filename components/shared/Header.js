import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Header() {
  return (
    <SafeAreaView>
      <View className="">
        <View className="flex-row justify-between items-center min-h-[72px] w-full mt-[16px]">
          <Image
            className="w-[40px] h-[40px]"
            source={require("../../assets/icons/global/menu.png")}
            width={40}
            height={40}
          />
          <Image
            className="flex-grow"
            source={require("../../assets/brand/logo.png")}
            width={375}
            height={28}
            resizeMode="contain"
          />
          <Image
            className="w-[40px] h-[40px] rounded-full"
            source={require("../../assets/images/global/profile.png")}
            width={148}
            height={28}
            resizeMode="contain"
          />
        </View>
        <Text className="">Header</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
