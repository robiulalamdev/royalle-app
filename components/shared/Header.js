import { Image, Pressable, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import ProfileImage from "../common/auth/ProfileImage";

export default function Header({}) {
  const { user } = useSelector((state) => state.user);
  const router = useRouter();

  return (
    <SafeAreaView>
      <View className="">
        <View className="flex-row justify-between items-center w-full mt-[16px]">
          <Pressable onPress={() => router.push("/search")}>
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

          <TouchableOpacity onPress={() => router.push("profile")}>
            <ProfileImage
              className="w-[40px] h-[40px] rounded-full"
              url={user?.image}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
