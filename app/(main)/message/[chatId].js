import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { getMessagesByChatId } from "../../../helpers/common";
import { inboxMessages } from "../../../constants/data";
import { SafeAreaView } from "react-native-safe-area-context";
import InboxHeader from "../../../components/message/inbox/InboxHeader";
import SendMessageBox from "../../../components/message/inbox/SendMessageBox";
import SingleMessage from "../../../components/message/inbox/SingleMessage";
import {
  useGetMessageByChatIdQuery,
  useSendMessageMutation,
  useUnseenToSeenMutation,
} from "../../../redux/features/conversations/conversationApi";
import { useSelector } from "react-redux";

export default function InboxScreen() {
  const { user } = useSelector((state) => state.user);
  const { chat = {} } = useSelector((state) => state.conversation);
  const { chatId } = useLocalSearchParams();
  const { data = [] } = useGetMessageByChatIdQuery(chatId, {
    refetchOnMountOrArgChange: true,
  });
  const [sendMessage] = useSendMessageMutation();
  const [unseenToSeen] = useUnseenToSeenMutation();
  const [messages, setMessages] = useState([]);
  const scrollViewRef = useRef(null);

  const handleSeenMessage = async () => {
    const options = {
      chatId: chatId,
      data: {},
    };
    await unseenToSeen(options);
    // console.log(result);
  };

  useEffect(() => {
    if (data?.data) {
      setMessages(data.data);
      handleSeenMessage();
    }
  }, [data]);

  const handleSendMessage = async (messageData) => {
    if (messageData) {
      const options = {
        data: {
          chatId: chatId,
          message: messageData,
          senderId: user?._id,
          members: chat?.members,
        },
      };

      const result = await sendMessage(options);
      if (result?.data?.success) {
        setMessages((prevMessages) => {
          const newMessages = [
            ...prevMessages,
            {
              chatId: chatId,
              message: messageData,
              senderId: user?._id,
              members: chat?.members,
              isSeen: false,
            },
          ];
          return newMessages;
        });
      }
    }
  };

  useEffect(() => {
    // Scroll to the bottom when messages state changes
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  // console.log(messages);

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
