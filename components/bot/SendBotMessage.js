import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";

export default function SendBotMessage({ handleSendMessage }) {
  const [messageInput, setMessageInput] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    await handleSendMessage({
      id: 12,
      message: messageInput,
      isBot: false,
    });

    setMessageInput("");
  };
  return (
    <View className="min-h-[56px] max-h-[56px] flex-row flex-grow justify-between items-center gap-x-[8px] mt-[8px]">
      <View className="h-full bg-[#FFFFFF1F] rounded-[110px] flex-grow flex-row items-center">
        <Pressable>
          <Image
            source={require("../../assets/icons/bot/microphone.png")}
            className="w-[24px] h-[24px] mr-[12px] ml-[20px]"
          />
        </Pressable>
        <TextInput
          onChangeText={setMessageInput}
          value={messageInput}
          placeholder="Write your message"
          className="flex-grow text-white leading-normal font-normal text-[13px] placeholder:!text-white max-w-[68%] pr-0 m-0"
          placeholderTextColor="white"
          style={{ fontFamily: "PoppinsMedium" }}
          accessibilityElementsHidden={true}
        />
      </View>
      <Pressable
        onPress={() => handleSubmit()}
        className="w-[56px] h-[56px] bg-[#FFFFFF1F] rounded-full flex justify-center items-center"
      >
        <Image
          source={require("../../assets/icons/bot/send.png")}
          className="w-[24px] h-[24px]"
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({});
