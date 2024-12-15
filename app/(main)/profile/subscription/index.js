import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Assets } from "../../../../lib/assets";
import { useRouter } from "expo-router";
import { Button } from "react-native-paper";
import { SCREEN_WIDTH } from "../../../../helpers/common";

const packages = [
  {
    id: 1,
    name: "Free Plan",
    price: { monthly: "Free", yearly: "Free" },
    features: [
      "Limited daily friend requests (e.g., 20 per day).",
      "Limited swipes or matches (e.g., 20 swipes/day).",
      "Basic filters (age, location).",
      "Cannot view who liked your profile.",
      "Ads displayed within the app.",
      "No access to boost profile visibility.",
      "Standard profile visibility.",
    ],
  },
  {
    id: 2,
    name: "Premium Plan",
    price: { monthly: 9.99, yearly: 79.99 },
    features: [
      "Increased daily friend request limit (e.g., 60 per day).",
      "Unlimited swipes or matches.",
      "Access to advanced filters (e.g., interests, height, profession).",
      "View who liked your profile.",
      "Priority customer support.",
      "Ad-free experience.",
      "Monthly profile boost (e.g., profile appears at the top for 1 hour once a month).",
      "Ability to undo a swipe.",
    ],
  },
  {
    id: 2,
    name: "VIP Plan",
    price: { monthly: 19.99, yearly: 149.99 },
    features: [
      "Unlimited friend requests.",
      "Unlimited swipes or matches.",
      "Access to all filters (e.g., verified profiles, activity status).",
      "View who liked your profile and see when they liked you.",
      "Ad-free experience.",
      "Weekly profile boost.",
      "Enhanced profile visibility in searches.",
      "Read receipts for messages.",
      "See who viewed your profile.",
      "Priority listing in match suggestions.",
      "Exclusive VIP badge on profile.",
      "Early access to new features.",
      "Higher match priority with popular profiles.",
    ],
  },
];

const SubscriptionScreen = () => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("Monthly");
  return (
    <ScrollView className="bg-black h-full flex-1 px-[20px] py-[32px]">
      <StatusBar style="light" />
      <View className="pb-[100px]">
        <View className="mt-[32px]">
          <View className="flex-row items-center gap-x-[12px]">
            <TouchableOpacity onPress={() => router.back()}>
              <Image
                source={Assets.Icons.cross}
                resizeMode="contain"
                className="w-[40px] h-[40px]"
              />
            </TouchableOpacity>
            <Text className="text-white font-Poppins-Bold text-[20px]">
              Subscriptions
            </Text>
          </View>
          <Text className="text-gray-300 font-Poppins-Medium text-[14px] leading-[20px] mt-[16px]">
            Unlock exclusive features with our premium subscriptions and elevate
            your dating experience! Choose a plan that suits your needs
          </Text>
        </View>

        <View className="flex-row justify-center items-center bg-white rounded-[32px] py-[3px] w-[205px] mx-auto mt-[32px]">
          <Button
            onPress={() => setSelectedTab("Monthly")}
            mode="contained"
            textColor={selectedTab === "Monthly" ? "white" : "black"}
            className={`w-[100px] rounded-[32px] font-Poppins-Medium text-[16px] ${
              selectedTab === "Monthly" ? "bg-primary" : "bg-transparent"
            }`}
          >
            Monthly
          </Button>
          <Button
            onPress={() => setSelectedTab("Yearly")}
            mode="contained"
            textColor={selectedTab === "Yearly" ? "white" : "black"}
            className={`w-[100px] rounded-[32px] font-Poppins-Medium text-[16px] ${
              selectedTab === "Yearly" ? "bg-primary" : "bg-transparent"
            }`}
          >
            Yearly
          </Button>
        </View>

        <View>
          {packages.map((item, index) => (
            <View
              key={index}
              className="bg-gray-950 border-[1px] border-gray-700 rounded-[16px] px-[16px] py-[20px] mt-[22px]"
            >
              <View className="flex-row items-center justify-between">
                <Text className="text-white font-Poppins-Bold text-[18px]">
                  {item?.name}
                </Text>
                <View className="flex-row items-center">
                  <Text className="text-white font-Poppins-SemiBold text-[16px]">
                    $
                    {selectedTab === "Monthly"
                      ? item?.price?.monthly
                      : item?.price?.yearly}{" "}
                    /
                  </Text>
                  <Text className="text-white font-Poppins-Regular text-[10px] mt-[5px]">
                    {selectedTab === "Monthly" ? "per month" : "per year"}
                  </Text>
                </View>
              </View>

              <View
                className={`ml-[12px] gap-y-[16px] mt-[16px]`}
                style={{ maxWidth: SCREEN_WIDTH - 130 }}
              >
                {item?.features?.map((ftr, i) => (
                  <View key={i} className="flex-row gap-x-[12px]">
                    <Image
                      source={Assets.Icons.premium_badge}
                      resizeMode="contain"
                      className="w-[24px] h-[24px]"
                    />
                    <Text className="text-gray-300 font-Poppins-Medium text-[14px] leading-[20px]">
                      {ftr}
                    </Text>
                  </View>
                ))}
              </View>

              <Button
                onPress={() => console.log("")}
                mode="contained"
                className={`w-full max-w-[200px] mx-auto mt-[32px] bg-primary`}
              >
                Subscribe
              </Button>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default SubscriptionScreen;
