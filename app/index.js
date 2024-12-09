import { Button, Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import { initialItems } from "../constants/data";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

export default function WelcomeScreen() {
  const { user } = useSelector((state) => state.nonPersisted.user);

  const handleItem = async () => {
    router.push("(main)");
  };

  // console.log(user);
  return (
    <SafeAreaView className="bg-black px-[3px] py-[10px] flex-1 w-full h-full">
      <View className="flex-row flex-wrap cursor-pointer">
        {initialItems.map((item, index) => (
          <Pressable
            onPress={() => handleItem()}
            key={index}
            className="max-w-[50%] w-[50%] max-h-[50%] min-h-[50%] justify-between items-center px-[6px] border-t-[12px] border-black"
          >
            <View className="bg-white w-full max-h-[60px] justify-center items-center py-1">
              <Image
                source={item.logo}
                className="w-full h-full object-contain"
                resizeMode="contain"
              />
            </View>
            <View className="flex-grow max-h-[90%] h-full w-full relative">
              <Image
                source={item.image}
                className="w-full h-full object-cover"
                resizeMode="cover"
              />

              <View className="absolute bottom-2 right-0 left-0 w-full px-[8px] pb-[8px]">
                <View className="flex-row items-center gap-x-[12px] w-full">
                  <Text
                    className="text-white font-semibold leading-[30px] text-[14px]"
                    style={{ fontFamily: "PoppinsRegular" }}
                  >
                    {item?.name}
                  </Text>
                  <Image
                    source={require("../assets/icons/home/info.png")}
                    className="w-[24px] h-[24px]"
                    width={24}
                    height={24}
                  />
                </View>
                <View
                  className="min-h-[55px] w-full rounded-[12px] mt-[8px]"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.20)" }}
                >
                  <View className="px-[8px] pt-[8px] pb-[5px] flex-row justify-between items-start gap-[12px]">
                    <View className="max-w-[80%]">
                      <Text
                        className="text-white/90 font-normal leading-[18px] text-[12px]"
                        style={{ fontFamily: "PoppinsRegular" }}
                      >
                        {item?.about.slice(0, 30)}
                      </Text>
                    </View>
                    <Image
                      source={require("../assets/icons/home/backinfo.png")}
                      className="min-w-[28px] h-[28px]"
                      width={28}
                      height={28}
                    />
                  </View>
                </View>
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
