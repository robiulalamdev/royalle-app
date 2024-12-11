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

const routes = [
  { id: 1, name: "Favorites", path: "profile/favorite" },
  { id: 2, name: "Preferences", path: "profile/preference" },
  { id: 3, name: "Subscription", path: "profile/subscription" },
];

const ProfileScreen = () => {
  const { user } = useSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    dispatch(setUser(null));
  };

  const { data } = useMyInfoQuery();

  // console.log(data);

  return (
    <SafeAreaView className="bg-black h-full flex-1 px-[20px] py-[32px]">
      <StatusBar style="light" />
      <View className="flex-row items-center justify-between w-full h-[50px]">
        <Pressable onPress={() => router.back()}>
          <Image
            source={require("../../../assets/images/message/inbox/leftArrow.png")}
            className="w-[40px] h-[40px]"
          />
        </Pressable>
        <Text className="text-white font-medium leading-[18px]">Profile</Text>
        <View className="w-[40px] h-[40px]"></View>
      </View>
      <View className="flex-row justify-center items-center gap-x-[32px] mt-[32px]">
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
            className="w-[110px] h-[32px] bg-primary justify-center items-center rounded-[8px] mt-[16px]"
          >
            <Text className="text-center font-medium text-[#010404] leading-[24px] text-[14px]">
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="gap-y-[24px] mt-[52px]">
        {routes.map((item, index) => (
          <TouchableOpacity
            onPress={() => router.push(item.path)}
            key={index}
            className="flex-row items-center gap-x-[12px]"
          >
            <View className="w-[15px] h-[15px] rounded-sm bg-green-600"></View>
            <Text className="text-white text-[16px] font-medium">
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          onPress={() => handleLogout()}
          className="flex-row items-center gap-x-[12px]"
        >
          <View className="w-[15px] h-[15px] rounded-sm bg-red-600"></View>
          <Text className="text-red-600 font-medium text-[16px]">Log out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
