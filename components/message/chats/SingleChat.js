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
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";

export default function SingleChat({ data = null, handleChat }) {
  const [fontsLoaded] = useFonts({ PoppinsRegular: Poppins_400Regular });
  const router = useRouter();

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  const handleSelectChat = (chat) => {
    handleChat(chat);
  };
  return (
    <Pressable
      onPress={() => handleSelectChat(data)}
      className="h-[72px] w-full border-[1px] border-[#FFFFFF29] rounded-[20px] mt-[16px]"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.04)" }}
    >
      <View className="flex-row items-center gap-x-[8px] relative w-full h-full px-[12px]">
        <Image
          source={data?.user?.image}
          className="w-[48px] h-[48px] rounded-full"
          resizeMode="cover"
        />
        <View className="w-full max-w-[285px]">
          <View className="flex-row w-full justify-between items-center">
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="font-poppins text-[14px] font-medium leading-[20px] text-white max-w-[220px]"
              style={{ fontFamily: "PoppinsRegular" }}
            >
              {data?.user?.name} sdfdsfdsf s sfdf sdfdf sdfsfdf sdfd d
            </Text>
            <Text
              className="font-poppins text-[10px] font-normal leading-[24px] text-[#FFFFFF99] text-right "
              style={{ fontFamily: "PoppinsRegular" }}
            >
              {data?.lastMessage?.createdAt}
            </Text>
          </View>
          <View className="flex-row w-full justify-between items-center mt-[10px]">
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="font-poppins text-[12px] font-normal leading-[16px] text-[#FFFFFF99] max-w-[220px]"
              style={{ fontFamily: "PoppinsRegular" }}
            >
              {data?.lastMessage?.message}
            </Text>
            {data?.unseen > 0 ? (
              <View className="w-[20px] h-[20px] bg-primary rounded-full flex justify-center items-center">
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  className="font-poppins text-[10px] font-medium leading-normal text-white"
                  style={{ fontFamily: "PoppinsRegular" }}
                >
                  {data?.unseen}
                </Text>
              </View>
            ) : (
              <View>
                <Image
                  source={require("../../../assets/images/message/chat/dubbleCheck.png")}
                  className="w-[20px] h-[20px]"
                />
              </View>
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
