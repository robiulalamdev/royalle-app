import { View, Text } from "react-native";
import React from "react";
import { TouchableRipple } from "react-native-paper";
import ProfileImage from "../auth/ProfileImage";
import { useRouter } from "expo-router";
import { SCREEN_WIDTH } from "../../../helpers/common";

const NotificationCard = ({ data = {} }) => {
  const router = useRouter();

  const handleNotification = async (data = {}) => {
    console.log("click");
  };
  return (
    <>
      <TouchableRipple
        onPress={() => handleNotification(data)}
        rippleColor="rgba(255, 255, 255, 0.09)"
        className={`min-h-[70px] max-h-[100px] w-full border-[1px] border-[#FFFFFF29] rounded-[20px] mt-[10px]
            ${
              (data?.type === "friend_request" && "border-[#00ff0075]") ||
              (data?.type === "new_message" && "border-primary/50") ||
              (data?.type === "profile_viewed" && "border-purple-600/50") ||
              (data?.type === "favorited" && "border-yellow-600/50")
            }
            `}
        style={{ backgroundColor: "rgba(255, 255, 255, 0.04)" }}
      >
        <View className="flex-row gap-x-[12px] relative w-full h-full px-[12px] py-[12px]">
          <ProfileImage className="w-[48px] h-[48px] rounded-full" />
          <View className="w-full max-w-[285px]">
            <View className="flex-row w-full justify-between items-center">
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                className="font-poppins text-[14px] font-medium leading-[20px] text-white"
                style={{
                  fontFamily: "Poppins-Regular",
                  width: SCREEN_WIDTH - 120,
                }}
              >
                <Text className="font-Inter-Bold">{data?.user?.name}</Text>{" "}
                {data?.message}
              </Text>
            </View>
            <View className="flex-row w-full justify-between items-center mt-[5px]">
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                className="font-poppins text-[10px] font-normal leading-[24px] text-[#FFFFFF99]"
                style={{ fontFamily: "Poppins-Regular" }}
              >
                10/465/546
              </Text>
            </View>
          </View>
        </View>
      </TouchableRipple>
    </>
  );
};

export default NotificationCard;
