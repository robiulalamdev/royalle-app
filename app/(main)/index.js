import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import Header from "../../components/shared/Header";
import BottomTab from "../../components/shared/BottomTab";
import HomeCarousel from "../../components/home/HomeCarousel";
import FriendCard from "../../components/common/items/FriendCard";
import { homeItems } from "../../constants/data";

const WelcomePage = () => {
  return (
    <>
      <View className="bg-black h-full flex-1 justify-between w-full">
        <StatusBar style="light" />
        <ScrollView>
          <View className="px-[20px]">
            <Header />

            <HomeCarousel />
            <View className="">
              {homeItems?.map((item, index) => (
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
