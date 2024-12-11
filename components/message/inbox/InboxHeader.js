import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function InboxHeader({ data = null }) {
  const router = useRouter();

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <View className="flex-row justify-between items-center mt-[16px] min-h-[72px] border-b-[1px] border-[#FFFFFF29] px-[6px]">
      <View className="flex-row items-center gap-x-[12px]">
        <Pressable onPress={() => router.back()}>
          <Image
            source={require("../../../assets/images/message/inbox/leftArrow.png")}
            className="w-[40px] h-[40px]"
          />
        </Pressable>
        <View className="flex-row items-center gap-x-[8px]">
          <Image
            source={data?.user?.image}
            className="w-[40px] h-[40px] rounded-full"
            resizeMode="cover"
          />
          <View className="min-w-[103px] max-w-[120px]">
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="text-white text-[16px] font-medium leading-[20px]"
              style={{ fontFamily: "Poppins-Medium" }}
            >
              {data?.user?.name}
            </Text>
            <Text
              className="text-primary"
              style={{ fontFamily: "Poppins-Regular" }}
            >
              Online
            </Text>
          </View>
        </View>
      </View>
      <Image
        source={require("../../../assets/images/message/inbox/dotsThreeVertical.png")}
        className="w-[32px] h-[32px]"
      />
    </View>
  );
}

const styles = StyleSheet.create({});
