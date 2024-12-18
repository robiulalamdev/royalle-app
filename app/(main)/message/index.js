import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import SingleChat from "../../../components/message/chats/SingleChat";
// import { chats } from "../../../constants/data";
import BottomTab from "../../../components/shared/BottomTab";
import { useDispatch, useSelector } from "react-redux";
import { useMyChatsQuery } from "../../../redux/features/conversations/conversationApi";
import { setChat } from "../../../redux/features/conversations/conversationSlice";
import ProfileImage from "../../../components/common/auth/ProfileImage";
import { useSocket } from "../../../context/SocketContext";

export default function MessageScreen() {
  const { user } = useSelector((state) => state.user);
  const { refetch } = useMyChatsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const { chats = [], chat } = useSelector((state) => state.conversation);
  const router = useRouter();
  const dispatch = useDispatch();

  const { SOCKET } = useSocket();

  const handleChat = (selectChat) => {
    dispatch(setChat(selectChat));
    router.push(`message/${selectChat?._id}`);
  };

  useEffect(() => {
    const handleGetMessage = (receiveMessage) => {
      if (receiveMessage) {
        refetch();
      }
    };

    // Attach the event listener
    SOCKET.current.on("getMessage", handleGetMessage);

    // Cleanup function to avoid duplicate listeners
    return () => {
      SOCKET.current.off("getMessage", handleGetMessage);
    };
  }, [chat, user]); // Add dependencies for chat and user
  return (
    <SafeAreaView className="bg-screenbg h-full w-full px-[12px]">
      <View className="min-h-[72px] w-full flex-row justify-between items-center">
        <View className="flex-row items-center gap-x-[12px]">
          <Image
            source={require("../../../assets/images/message/msgHeader.png")}
            className="w-[40px] h-[40px]"
          />
          <Text className="font-medium text-[20px] leading-[28px] text-white font-poppins">
            Matches
          </Text>
        </View>

        <TouchableOpacity onPress={() => router.push("profile")}>
          <ProfileImage
            url={user?.image}
            resizeMode="cover"
            className="w-[40px] h-[40px] rounded-full"
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        alwaysBounceVertical={true}
        showsVerticalScrollIndicator={true}
        className=""
      >
        {chats.map((item, index) => (
          <SingleChat key={index} data={item} handleChat={handleChat} />
        ))}
      </ScrollView>
      <View
        className="fixed bottom-0 w-full right-0 left-0 bg-opacity-0"
        style={{ backgroundColor: "transparent" }}
      >
        <BottomTab currentTab="Message" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
