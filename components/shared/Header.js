import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";

export default function Header() {
  const { user } = useSelector((state) => state.nonPersisted.user);
  const router = useRouter();
  return (
    <SafeAreaView>
      <View className="">
        <View className="flex-row justify-between items-center min-h-[72px] w-full mt-[16px]">
          <Pressable onPress={() => router.push("filter")}>
            <Image
              className="w-[40px] h-[40px]"
              source={require("../../assets/icons/global/menu.png")}
              width={40}
              height={40}
            />
          </Pressable>
          <Image
            className="flex-grow max-w-[148px] max-h-[28px]"
            source={require("../../assets/brand/logo.png")}
            resizeMode="contain"
          />
          {user && user?.image ? (
            <Image
              className="w-[40px] h-[40px] rounded-full"
              source={{ uri: user?.image }}
              width={148}
              height={28}
              resizeMode="contain"
            />
          ) : (
            <Image
              className="w-[40px] h-[40px] rounded-full"
              source={require("../../assets/images/global/profile.png")}
              width={148}
              height={28}
              resizeMode="contain"
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
