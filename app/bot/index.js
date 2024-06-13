import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import SingleBotMessage from "../../components/bot/SingleBotMessage";
import SendBotMessage from "../../components/bot/SendBotMessage";
import { botConversations } from "../../constants/data";
import BotInitialQuestions from "../../components/bot/BotInitialQuestions";

export default function BotScreen() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const scrollViewRef = useRef(null);

  const handleGetMessages = async () => {
    setMessages(botConversations);
  };

  useEffect(() => {
    handleGetMessages();
  }, []);

  const handleSendMessage = (messageData) => {
    setMessages((prevMessages) => {
      const newMessages = [...prevMessages, messageData];
      return newMessages;
    });
  };

  const handleInitialQna = (data) => {
    const userMessage = { id: 11, isBot: false, message: data?.question };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setTimeout(() => {
      const botMessage = { id: 10, isBot: true, message: data?.response };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 500);
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);
  return (
    <SafeAreaView className="bg-black flex-1">
      <StatusBar style="light" />
      <View className="min-h-[72px] flex-row items-center justify-between px-[10px] border-b-[1px] border-[#FFFFFF50]">
        <View className="flex-row items-center gap-x-[12px]">
          <Pressable onPress={() => router.back()}>
            <Image
              source={require("../../assets/icons/bot/LeftArrow.png")}
              className="w-[40px] h-[40px]"
            />
          </Pressable>
          <View className="flex-row items-center gap-x-[8px]">
            <Image
              source={require("../../assets/icons/bot/bot.png")}
              className="w-[40px] h-[40px]"
            />
            <Text className="text-white text-[20px] font-medium leading-[28px]">
              AI Assistant
            </Text>
          </View>
        </View>
        <Image
          source={require("../../assets/icons/bot/DotsThreeVertical.png")}
          className="w-[32px] h-[32px]"
        />
      </View>
      <ScrollView
        ref={scrollViewRef}
        alwaysBounceVertical={true}
        showsVerticalScrollIndicator={true}
        className="flex-grow"
        contentContainerStyle={styles.scrollViewContent}
      >
        {messages.map((message, index) => (
          <SingleBotMessage key={index} data={message} />
        ))}
        <BotInitialQuestions handleInitialQna={handleInitialQna} />
      </ScrollView>
      <SendBotMessage handleSendMessage={handleSendMessage} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 6,
    flexGrow: 1,
    justifyContent: "flex-end",
  },
});
