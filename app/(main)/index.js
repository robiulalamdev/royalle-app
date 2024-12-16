import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import Header from "../../components/shared/Header";
import BottomTab from "../../components/shared/BottomTab";
import HomeCarousel from "../../components/home/HomeCarousel";
import FriendCard from "../../components/common/items/FriendCard";
import { homeItems } from "../../constants/data";
import { useSelector } from "react-redux";
import {
  useMyBestMatchesQuery,
  useMyFeedsQuery,
} from "../../redux/features/user/userApi";

const WelcomePage = () => {
  const { refetch } = useMyFeedsQuery();
  const { refetch: bestMatchRefetch } = useMyBestMatchesQuery();
  const { feeds = [], bestMatches = [] } = useSelector((state) => state.user);
  const [refreshing, setRefreshing] = useState(false);

  // Function to handle refresh
  const onRefresh = () => {
    setRefreshing(true);
    bestMatchRefetch();
    refetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  // console.log(bestMatches);

  return (
    <>
      <View className="bg-black h-full flex-1 justify-between w-full">
        <StatusBar style="light" />
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View className="px-[20px]">
            <Header />

            <HomeCarousel
              items={bestMatches}
              refetch={() => bestMatchRefetch()}
            />
            <View className="">
              {feeds?.map((item, index) => (
                <FriendCard key={index} item={item} className="mt-[20px]" />
              ))}
            </View>
          </View>
        </ScrollView>
        <BottomTab currentTab="Home" />
      </View>
    </>
  );
};

export default WelcomePage;
