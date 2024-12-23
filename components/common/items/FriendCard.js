import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Dialog } from "react-native-paper";

export default function FriendCard({ item = {}, className = "mt-[20px]" }) {
  // console.log(className);

  return (
    <>
      <View className={`relative max-h-[380px] w-full ${className}`}>
        <Image
          source={{ uri: item?.user?.image }}
          className="max-h-[380px] w-full rounded-[15px] h-full"
        />
        <LinearGradient
          colors={["transparent", "rgba(0, 0, 0, 0.4)", "rgba(0, 0, 0, 0.8)"]}
          className="min-h-[92px] max-h-[50%] h-full w-full rounded-[15px] absolute bottom-0 right-0 left-0"
        />
        <View className="absolute bottom-0 right-0 left-0 w-full px-[8px] pb-[8px]">
          <View className="flex-row items-center gap-x-[12px] w-full">
            <Text
              className="text-white font-semibold leading-[30px] text-[22px]"
              style={{ fontFamily: "Poppins-Regular" }}
            >
              {item?.user?.name}
            </Text>
            <Image
              source={require("../../../assets/icons/home/info.png")}
              className="w-[24px] h-[24px] rounded-full"
              width={24}
              height={24}
            />
          </View>
          <View
            className="min-h-[92px] w-full rounded-[12px] pb-[12px] mt-[8px]"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.08)" }}
          >
            <View className="px-[8px] pt-[8px] pb-[12px] flex-row justify-between items-start gap-[12px]">
              <View className="max-w-[80%]">
                <Text
                  numberOfLines={4}
                  ellipsizeMode="tail"
                  className="text-white/90 font-normal leading-[18px] text-[12px]"
                  style={{ fontFamily: "Poppins-Regular" }}
                >
                  {item?.user?.bio}
                </Text>
              </View>
              <Image
                source={require("../../../assets/icons/home/backinfo.png")}
                className="min-w-[28px] h-[28px]"
                width={28}
                height={28}
              />
            </View>
            <View className="px-[8px] flex-row items-center gap-[10px]">
              <View className="flex-row !items-center justify-center gap-x-[4px] py-[4px] px-[8px] rounded-[80px] border-[1px] border-[#FFFFFF05] bg-[#FFFFFF0A]">
                <Image
                  source={require("../../../assets/icons/home/location.png")}
                  className="w-[16px] h-[16px] bg-transparent"
                  resizeMode="contain"
                />
                <Text
                  className="text-white font-normal leading-[20px] text-[12px]"
                  style={{ fontFamily: "Poppins-Regular" }}
                >
                  {parseInt(item?.distance?.miles)} Miles of you
                  {/* 2 Miles of you */}
                </Text>
              </View>
              <View className="flex-row !items-center justify-center gap-x-[4px] py-[4px] px-[8px] rounded-[80px] border-[1px] border-[#FFFFFF05] bg-[#FFFFFF0A]">
                <Text
                  className="text-white font-normal leading-[20px] text-[12px]"
                  style={{ fontFamily: "Poppins-Regular" }}
                >
                  {item?.user?.location?.country}
                </Text>
              </View>
              <View className="flex-row !items-center justify-center gap-x-[4px] py-[4px] px-[8px] rounded-[80px] border-[1px] border-[#FFFFFF05] bg-[#FFFFFF0A]">
                <Text
                  className="text-white font-normal leading-[20px] text-[12px]"
                  style={{ fontFamily: "Poppins-Regular" }}
                >
                  {item?.user?.age} {item?.user?.age > 1 ? "years" : "year"}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
