import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";

export default function SendMessageBox({ handleSendMessage }) {
  const router = useRouter();

  const [messageInput, setMessageInput] = useState("");

  const handleSubmit = async () => {
    await handleSendMessage({
      id: 12,
      message: messageInput,
      user: { id: 2 },
    });

    setMessageInput("");
  };
  return (
    <View className=" min-h-[56px] max-h-[56px] flex-row justify-between items-center px-[6px] mt-[10px]">
      <View className="!bg-[#FFFFFF1F] rounded-[110px] flex-row h-full flex-grow">
        <View className="flex-row items-center gap-x-[8px] ml-[12px]">
          <Pressable>
            <Image
              source={require("../../../assets/images/message/inbox/microphone.png")}
              className="w-[24px] h-[24px]"
            />
          </Pressable>
          <Pressable>
            <Image
              source={require("../../../assets/images/message/inbox/gallary.png")}
              className="w-[24px] h-[24px] ml-[8px]"
            />
          </Pressable>
        </View>
        <TextInput
          onChangeText={setMessageInput}
          value={messageInput}
          placeholder="Write your message"
          className="flex-grow text-white text-[13px] placeholder:!text-white ml-[12px] mr-0 p-0 max-w-[55%]"
          placeholderTextColor="white"
          style={{ fontFamily: "Poppins-Medium" }}
        />
      </View>
      <View className="w-[64px] flex-row justify-end">
        <Pressable
          onPress={() => handleSubmit()}
          className="w-[56px] h-[56px] bg-[#FFFFFF1F] rounded-full flex justify-center items-center"
        >
          <Image
            source={require("../../../assets/images/message/inbox/send.png")}
            className="w-[24px] h-[24px]"
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
