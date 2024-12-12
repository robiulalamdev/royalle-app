import { View, Text } from "react-native";
import React from "react";
import { TouchableRipple } from "react-native-paper";
import ProfileImage from "../auth/ProfileImage";
import { useRouter } from "expo-router";

const FriendListItem = () => {
  const router = useRouter();
  return (
    <>
      <TouchableRipple
        onPress={() => router.push("profile/friends/1")}
        rippleColor="rgba(255, 255, 255, 0.09)"
        className="h-[72px] w-full border-[1px] border-[#FFFFFF29] rounded-[20px] mt-[16px]"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.04)" }}
      >
        <View className="flex-row items-center gap-x-[8px] relative w-full h-full px-[12px]">
          <ProfileImage className="w-[48px] h-[48px] rounded-full" />
          <View className="w-full max-w-[285px]">
            <View className="flex-row w-full justify-between items-center">
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                className="font-poppins text-[14px] font-medium leading-[20px] text-white max-w-[220px]"
                style={{ fontFamily: "Poppins-Regular" }}
              >
                Nahid Murad Abir
              </Text>
              <Text
                className="font-poppins text-[10px] font-normal leading-[24px] text-[#FFFFFF99] text-right "
                style={{ fontFamily: "Poppins-Regular" }}
              >
                10/465/546
              </Text>
            </View>
            <View className="flex-row w-full justify-between items-center mt-[5px]">
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                className="font-poppins text-[12px] font-normal leading-[16px] text-[#FFFFFF99] max-w-[220px]"
                style={{ fontFamily: "Poppins-Regular" }}
              >
                Bangladesh
              </Text>
            </View>
          </View>
        </View>
      </TouchableRipple>
    </>
  );
};

export default FriendListItem;
