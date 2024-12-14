import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";
import { Button } from "react-native-paper";
import { Assets } from "../../../../lib/assets";
import FriendListItem from "../../../../components/common/items/FriendListItem";
import {
  useFriendRequestQuery,
  useMyFriendsQuery,
} from "../../../../redux/features/friend/friendApi";

const MyFriends = () => {
  const { data, refetch: refetchFriends } = useMyFriendsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const { data: requestData, refetch: refetchFriendRequest } =
    useFriendRequestQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });

  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("Requests");

  const [refreshing, setRefreshing] = useState(false);

  // Function to handle refresh
  const onRefresh = () => {
    setRefreshing(true);
    if (selectedTab === "Requests") {
      refetchFriendRequest();
    } else {
      refetchFriends();
    }
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
          Friends
        </Text>
        <View className="w-[40px] h-[40px]"></View>
      </View>

      <ScrollView
        className="px-[16px]"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="flex-row justify-center items-center bg-white rounded-[32px] py-[3px] w-[307px] mx-auto mt-[16px]">
          <Button
            onPress={() => setSelectedTab("Requests")}
            mode="contained"
            textColor={selectedTab === "Requests" ? "white" : "black"}
            className={`w-[150px] p-0 rounded-[32px] font-Poppins-Medium text-[16px] ${
              selectedTab === "Requests" ? "bg-primary" : "bg-transparent"
            }`}
          >
            Requests
          </Button>
          <Button
            onPress={() => setSelectedTab("Friends")}
            mode="contained"
            textColor={selectedTab === "Friends" ? "white" : "black"}
            className={`w-[150px] p-0 rounded-[32px] font-Poppins-Medium text-[16px] ${
              selectedTab === "Friends" ? "bg-primary" : "bg-transparent"
            }`}
          >
            Friends
          </Button>
        </View>

        {selectedTab === "Requests" && (
          <>
            {requestData?.data?.map((item, index) => (
              <FriendListItem key={index} item={item} />
            ))}
          </>
        )}
        {selectedTab === "Friends" && (
          <>
            {data?.data?.map((item, index) => (
              <FriendListItem key={index} item={item} />
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyFriends;
