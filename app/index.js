import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import Header from "../components/shared/Header";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import BottomTab from "../components/shared/BottomTab";

const WelcomePage = () => {
  const [fontsLoaded] = useFonts({ PoppinsRegular: Poppins_400Regular });
  const router = useRouter();

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }
  return (
    <View className="bg-black h-full flex-1 justify-between w-full">
      <StatusBar style="light" />
      <View>
        <View className="px-[20px]">
          <Header />
          <View className="mt-[16px] relative max-h-[380px] w-full">
            <Image
              source={require("../assets/images/home/img1.png")}
              className="max-h-[380px] w-full rounded-[15px]"
            />
            <View className="absolute bottom-0 right-0 left-0 w-full px-[8px] pb-[8px]">
              <View className="flex-row items-center gap-x-[12px] w-full">
                <Text
                  className="text-white font-semibold leading-[30px] text-[22px]"
                  style={{ fontFamily: "PoppinsRegular" }}
                >
                  Andrila Ramsey
                </Text>
                <Image
                  source={require("../assets/icons/home/info.png")}
                  className="w-[24px] h-[24px]"
                  width={24}
                  height={24}
                />
              </View>
              <View
                className="min-h-[92px] w-full rounded-[12px] mt-[8px]"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.08)" }}
              >
                <View className="px-[8px] pt-[8px] pb-[12px] flex-row justify-between items-start gap-[12px]">
                  <View className="max-w-[80%]">
                    <Text
                      className="text-white/90 font-normal leading-[18px] text-[12px]"
                      style={{ fontFamily: "PoppinsRegular" }}
                    >
                      An accomplished technology entrepreneur, innovator, and
                      thought leader
                    </Text>
                  </View>
                  <Image
                    source={require("../assets/icons/home/backinfo.png")}
                    className="min-w-[28px] h-[28px]"
                    width={28}
                    height={28}
                  />
                </View>
                <View className="px-[8px] flex-row items-center gap-[10px]">
                  <View className="flex-row !items-center justify-center gap-x-[4px] py-[4px] px-[8px] rounded-[80px] border-[1px] border-[#FFFFFF05] bg-[#FFFFFF0A]">
                    <Image
                      source={require("../assets/icons/home/location.png")}
                      className="min-w-[16px] h-[16px]"
                      width={16}
                      height={16}
                    />
                    <Text
                      className="text-white font-normal leading-[20px] text-[12px]"
                      style={{ fontFamily: "PoppinsRegular" }}
                    >
                      2KM of you
                    </Text>
                  </View>
                  <View className="flex-row !items-center justify-center gap-x-[4px] py-[4px] px-[8px] rounded-[80px] border-[1px] border-[#FFFFFF05] bg-[#FFFFFF0A]">
                    <Text
                      className="text-white font-normal leading-[20px] text-[12px]"
                      style={{ fontFamily: "PoppinsRegular" }}
                    >
                      New York
                    </Text>
                  </View>
                  <View className="flex-row !items-center justify-center gap-x-[4px] py-[4px] px-[8px] rounded-[80px] border-[1px] border-[#FFFFFF05] bg-[#FFFFFF0A]">
                    <Text
                      className="text-white font-normal leading-[20px] text-[12px]"
                      style={{ fontFamily: "PoppinsRegular" }}
                    >
                      24 years
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View className="px-[20px] mt-[28px] flex-row justify-between items-center gap-x-[10px]">
          <Pressable>
            <Image
              source={require("../assets/icons/home/left.png")}
              className="w-[40px] h-[40px]"
            />
          </Pressable>
          <Pressable>
            <Image
              source={require("../assets/icons/home/reload.png")}
              className="w-[48px] h-[48px]"
            />
          </Pressable>
          <Pressable>
            <Image
              source={require("../assets/icons/home/love.png")}
              className="w-[48px] h-[48px]"
            />
          </Pressable>
          <Pressable>
            <Image
              source={require("../assets/icons/home/message.png")}
              className="w-[48px] h-[48px]"
            />
          </Pressable>
          <Pressable>
            <Image
              source={require("../assets/icons/home/right.png")}
              className="w-[40px] h-[40px]"
            />
          </Pressable>
        </View>
      </View>
      <BottomTab currentTab="Home" />
    </View>
  );
};

export default WelcomePage;
