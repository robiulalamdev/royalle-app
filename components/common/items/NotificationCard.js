import { View, Text } from "react-native";
import React from "react";
import { TouchableRipple } from "react-native-paper";
import ProfileImage from "../auth/ProfileImage";
import { useRouter } from "expo-router";
import { SCREEN_WIDTH } from "../../../helpers/common";
import { NOTIFICATION_TYPES } from "../../../constants/data";
import moment from "moment";

const NotificationCard = ({ data = {} }) => {
  const router = useRouter();

  const handleNotification = async () => {
    if (data) {
      if (data?.type === NOTIFICATION_TYPES.FRIEND_REQUEST) {
        router.push("profile/friends");
      }
      if (data?.type === NOTIFICATION_TYPES.FRIEND_REQUEST_ACCEPT) {
        router.push("profile/friends");
      }
      if (data?.type === NOTIFICATION_TYPES.FRIEND_REQUEST_REJECT) {
        router.push("profile/friends");
      }
    }
  };
  return (
    <>
      <TouchableRipple
        onPress={() => handleNotification()}
        rippleColor="rgba(255, 255, 255, 0.09)"
        className={`min-h-[70px] max-h-[110px] w-full border-[1px] border-[#FFFFFF29] rounded-[20px] mt-[10px]
            ${
              (data?.type === NOTIFICATION_TYPES.FRIEND_REQUEST &&
                "border-[#00ff0075]") ||
              (data?.type === NOTIFICATION_TYPES.FRIEND_REQUEST_ACCEPT &&
                "border-primary/50") ||
              (data?.type === NOTIFICATION_TYPES.PROFILE_VIEW &&
                "border-purple-600/50") ||
              (data?.type === NOTIFICATION_TYPES.FAVORITE &&
                "border-yellow-600/50") ||
              (data?.type === NOTIFICATION_TYPES.FRIEND_REQUEST_REJECT &&
                "border-red-600/50") ||
              (data?.type === NOTIFICATION_TYPES.MATCHES &&
                "border-blue-600/50") ||
              (data?.type === NOTIFICATION_TYPES.MESSAGE &&
                "border-orange-600/50")
            }
            `}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.04)",
          alignSelf: "flex-start",
        }}
      >
        <View className="flex-row gap-x-[12px] relative w-full h-full px-[12px] py-[12px]">
          <ProfileImage
            url={data?.from?.image}
            className="w-[48px] h-[48px] rounded-full"
          />
          <View className="w-full max-w-[285px]">
            <View className="flex-row w-full justify-between items-center">
              <Text
                numberOfLines={3}
                ellipsizeMode="tail"
                className="font-poppins text-[14px] font-medium leading-[20px] text-white"
                style={{
                  fontFamily: "Poppins-Regular",
                  width: SCREEN_WIDTH - 120,
                }}
              >
                <Text className="font-Inter-Bold">{data?.from?.name}</Text>{" "}
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
                {moment(data?.createdAt).fromNow()}
              </Text>
            </View>
          </View>
        </View>
      </TouchableRipple>
    </>
  );
};

export default NotificationCard;
