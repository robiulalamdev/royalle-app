import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Assets } from "../../../lib/assets";
import { Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import NotificationCard from "../../../components/common/items/NotificationCard";
import { useMyNotificationsQuery } from "../../../redux/features/notifications/notificationApi";
import { useSelector } from "react-redux";

// const notifications = [
//   {
//     type: "friend_request",
//     user: { name: "Nahid Murad Abir" },
//     title: "Friend Request",
//     message: "sent you a friend request.",
//   },
//   {
//     type: "new_message",
//     user: { name: "Nahid Murad Abir" },
//     title: "New Message",
//     message: "sent you a new message.",
//   },
//   {
//     type: "favorited",
//     user: { name: "Nahid Murad Abir" },
//     title: "Favorited",
//     message: "added you to their favorites.",
//   },
//   {
//     type: "profile_viewed",
//     user: { name: "Nahid Murad Abir" },
//     title: "Profile Viewed",
//     message: "viewed your profile.",
//   },
// ];

const Notifications = () => {
  const { notifications } = useSelector((state) => state.notification);
  const { refetch } = useMyNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  // Function to handle refresh
  const onRefresh = () => {
    setRefreshing(true);
    refetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <SafeAreaView className="bg-black h-full flex-1 py-[32px]">
      <StatusBar style="light" />
      <View className="flex-row items-center justify-between w-full h-[50px] px-[10px] bg-black">
        <Pressable onPress={() => router.back()}>
          <Image
            source={Assets.Icons.backArrow}
            className="w-[40px] h-[40px]"
          />
        </Pressable>
        <Text className="text-white font-Poppins-Medium leading-[18px]">
          Notifications
        </Text>
        <View className="w-[40px] h-[40px]"></View>
      </View>

      <ScrollView
        className="px-[16px]"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View>
          {notifications.map((item, index) => (
            <NotificationCard key={index} data={item} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notifications;
