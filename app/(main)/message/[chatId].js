import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { getMessagesByChatId } from "../../../helpers/common";
import { inboxMessages, staticMessages } from "../../../constants/data";
import { SafeAreaView } from "react-native-safe-area-context";
import InboxHeader from "../../../components/message/inbox/InboxHeader";
import SendMessageBox from "../../../components/message/inbox/SendMessageBox";
import SingleMessage from "../../../components/message/inbox/SingleMessage";
import {
  useGetChatByIdQuery,
  useGetMessageByChatIdQuery,
  useSendMessageMutation,
  useUnseenToSeenMutation,
} from "../../../redux/features/conversations/conversationApi";
import { useDispatch, useSelector } from "react-redux";
import { setChat } from "../../../redux/features/conversations/conversationSlice";
import { useGenerateAiMessageMutation } from "../../../redux/features/helper/helperApi";
import { Button } from "react-native-paper";

export default function InboxScreen() {
  const { user } = useSelector((state) => state.user);
  const { chat = {} } = useSelector((state) => state.conversation);
  const { chatId } = useLocalSearchParams();
  const { data: chatData } = useGetChatByIdQuery(chatId);
  const { data = [] } = useGetMessageByChatIdQuery(chatId, {
    refetchOnMountOrArgChange: true,
  });
  const [sendMessage] = useSendMessageMutation();
  const [unseenToSeen] = useUnseenToSeenMutation();
  const [generateAiMessage] = useGenerateAiMessageMutation();
  const [messages, setMessages] = useState([]);
  const scrollViewRef = useRef(null);

  const dispatch = useDispatch();

  const handleSeenMessage = async () => {
    const options = {
      chatId: chatId,
      data: {},
    };
    await unseenToSeen(options);
    // console.log(result);
  };

  useEffect(() => {
    if (chatId && chatData?.data?._id) {
      dispatch(setChat(chatData?.data));
    }
  }, [chatData]);

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

  const handleGenerateMessage = async () => {
    const options = {
      data: {
        context:
          "Generate a personalized first-time message for a wedding match. make shortly",
      },
    };
    const result = await generateAiMessage(options);
    if (result?.data?.success) {
      if (result?.data?.data) {
        handleSendMessage(result?.data?.data);
      }
    }
  };

  return (
    <SafeAreaView className="bg-screenbg" style={styles.container}>
      <InboxHeader data={chat} />
      {/* {messages.length === 0 && (
        <View className="flex-1 justify-center items-center">
          <View className="flex-row justify-center flex-wrap gap-[12px] mt-[24px] mb-[12px]">
            {staticMessages.map((item, index) => (
              <Pressable
                onPress={() => handleInitialQna(item)}
                key={index}
                className="bg-[#FFFFFF14] rounded-[24px] py-[8px] px-[12px] max-w-[44%]"
              >
                <Text className="font-normal text-[12px] text-white text-center leading-[20px]">
                  {item}
                </Text>
              </Pressable>
            ))}

            <Pressable
              onPress={() => handleGenerateMessage()}
              className="bg-[#FFFFFF14] rounded-[24px] py-[8px] px-[12px] max-w-[44%]"
            >
              <Text className="font-normal text-[12px] text-white text-center leading-[20px]">
                Generate Message ✨
              </Text>
            </Pressable>
          </View>
        </View>
      )} */}
      <ScrollView
        ref={scrollViewRef}
        alwaysBounceVertical={true}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View className="flex-row justify-center flex-wrap gap-[12px] mt-[24px] mb-[12px]">
          {staticMessages.map((item, index) => (
            <TouchableOpacity
              onPress={() => handleSendMessage(item)}
              key={index}
              className="bg-[#FFFFFF14] rounded-[24px] py-[8px] px-[12px] max-w-[44%]"
            >
              <Text className="font-normal text-[12px] text-white text-center leading-[20px]">
                {item}
              </Text>
            </TouchableOpacity>
          ))}

          <Button
            onPress={() => handleGenerateMessage()}
            className="bg-[#FFFFFF14] rounded-[24px] px-[5px] max-w-[44%]"
          >
            <Text className="font-normal text-[12px] text-white text-center leading-[20px]">
              Generate Message ✨
            </Text>
          </Button>
        </View>
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
