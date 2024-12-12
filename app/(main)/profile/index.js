import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../redux/features/user/userSlice";
import { useRouter } from "expo-router";
import ProfileImage from "../../../components/common/auth/ProfileImage";
import { useMyInfoQuery } from "../../../redux/features/user/userApi";
import { Assets } from "../../../lib/assets";

const routes = [
  {
    id: 1,
    name: "Favorites",
    path: "profile/favorite",
    image: Assets.Icons.favorite,
  },
  {
    id: 2,
    name: "Preferences",
    path: "profile/preference",
    image: Assets.Icons.preference,
  },
  {
    id: 3,
    name: "Subscription",
    path: "profile/subscription",
    image: Assets.Icons.subscription,
  },
];

const ProfileScreen = () => {
  const { user } = useSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    dispatch(setUser(null));
  };

  return (
    <SafeAreaView className="bg-black h-full flex-1 py-[32px] justify-between w-full">
      <StatusBar style="light" />
      <View>
        <View className="flex-row items-center justify-between w-full h-[50px] px-[px]">
          <Pressable onPress={() => router.back()}>
            <Image
              source={require("../../../assets/images/message/inbox/leftArrow.png")}
              className="w-[40px] h-[40px]"
            />
          </Pressable>
          <Text className="text-white font-Poppins-Medium leading-[18px]">
            Profile
          </Text>
          <View className="w-[40px] h-[40px]"></View>
        </View>

        <View className="flex-row items-center gap-x-[32px] mt-[32px] px-[20px]">
          <ProfileImage
            url={user?.image}
            resizeMode="cover"
            className="w-[100px] h-[100px] rounded-full"
          />
          <View className="">
            <Text className="text-white font-bold text-[16px] leading-[24px]">
              {user?.name}
            </Text>
            <Text className="text-white/90 leading-[24px]">{user?.email}</Text>
            <TouchableOpacity
              onPress={() => router.push("/profile/update-profile")}
              className="w-[90px] h-[28px] bg-primary flex-row p-0 justify-center items-center rounded-[6px] mt-[10px]"
            >
              <Text className="text-center font-Poppins-Medium text-[#010404] text-[12px]">
                Edit Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="gap-y-[24px] mt-[52px] px-[20px]">
          {routes.map((item, index) => (
            <TouchableOpacity
              onPress={() => router.push(item.path)}
              key={index}
              className="flex-row items-center gap-x-[12px]"
            >
              <Image
                source={item?.image}
                resizeMode="contain"
                className="w-[20px] h-[20px]"
              />
              <Text className="text-white text-[16px] font-medium">
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            onPress={() => handleLogout()}
            className="flex-row items-center gap-x-[12px]"
          >
            <Image
              source={Assets.Icons.logout}
              resizeMode="contain"
              className="w-[20px] h-[20px]"
            />
            <Text className="text-red-600 font-medium text-[16px]">
              Log out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text className="text-gray-300 text-[14px] font-Poppins-Regular text-center">
        Beta version: 1.0.0
      </Text>
    </SafeAreaView>
  );
};

export default ProfileScreen;
