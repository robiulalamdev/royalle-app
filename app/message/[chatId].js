import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { getMessagesByChatId } from "../../helpers/common";
import { inboxMessages } from "../../constants/data";
import { SafeAreaView } from "react-native-safe-area-context";
import InboxHeader from "../../components/message/inbox/InboxHeader";
import SendMessageBox from "../../components/message/inbox/SendMessageBox";
import SingleMessage from "../../components/message/inbox/SingleMessage";

export default function InboxScreen() {
  const { chatId } = useLocalSearchParams();
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const scrollViewRef = useRef(null);

  const handleGetMessages = async () => {
    const result = await getMessagesByChatId(chatId);
    setChat(result);
    setMessages(inboxMessages);
  };

  useEffect(() => {
    if (chatId) {
      handleGetMessages();
    }
  }, [chatId]);

  const handleSendMessage = (messageData) => {
    setMessages((prevMessages) => {
      const newMessages = [...prevMessages, messageData];
      return newMessages;
    });
  };

  useEffect(() => {
    // Scroll to the bottom when messages state changes
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <SafeAreaView className="bg-screenbg " style={styles.container}>
      <InboxHeader data={chat} />
      <ScrollView
        ref={scrollViewRef}
        alwaysBounceVertical={true}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.scrollViewContent}
      >
        {messages.map((message, index) => (
          <SingleMessage key={index} data={message} chat={chat} />
        ))}
      </ScrollView>
      <SendMessageBox handleSendMessage={handleSendMessage} />
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
