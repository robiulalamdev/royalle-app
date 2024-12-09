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
import { useRouter } from "expo-router";
import Header from "../../components/shared/Header";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import BottomTab from "../../components/shared/BottomTab";
import HomeCarousel from "../../components/home/HomeCarousel";
import PrivateRoute from "../../routes/privateRoute";
import FriendCard from "../../components/common/items/FriendCard";
import { homeItems } from "../../constants/data";

const WelcomePage = () => {
  const [fontsLoaded] = useFonts({ PoppinsRegular: Poppins_400Regular });
  const router = useRouter();

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }
  return (
    <PrivateRoute>
      <View className="bg-black h-full flex-1 justify-between w-full">
        <StatusBar style="light" />
        <View>
          <View className="px-[20px]">
            <Header />
            <ScrollView>
              <HomeCarousel />
              <View className="">
                {homeItems?.map((item, index) => (
                  <FriendCard
                    key={item?.id}
                    item={item}
                    className="mt-[32px]"
                  />
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
        <BottomTab currentTab="Home" />
      </View>
    </PrivateRoute>
  );
};

export default WelcomePage;
