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
import { Assets } from "../../../lib/assets";
import moment from "moment";
import { Badge } from "react-native-paper";

const routes = [
  {
    id: 1,
    name: "Account",
    path: "profile/update-profile",
    image: Assets.Icons.account,
  },
  {
    id: 2,
    name: "Friends",
    path: "profile/friends",
    image: Assets.Icons.friends,
  },
  {
    id: 3,
    name: "Notifications",
    path: "profile/notifications",
    image: Assets.Icons.bell,
  },
  {
    id: 4,
    name: "Favorites",
    path: "profile/favorite",
    image: Assets.Icons.favorite,
  },
  {
    id: 5,
    name: "Preferences",
    path: "profile/preference",
    image: Assets.Icons.preference,
  },
  {
    id: 6,
    name: "Subscription",
    path: "profile/subscription",
    image: Assets.Icons.premium,
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
        <View className="flex-row items-center justify-between w-full h-[50px] px-[10px]">
          <Pressable onPress={() => router.back()}>
            <Image
              source={require("../../../assets/images/message/inbox/leftArrow.png")}
              className="w-[40px] h-[40px]"
            />
          </Pressable>
          <Text className="text-white font-Poppins-Medium leading-[18px]">
            Profile
          </Text>

          <View className="w-[40px] h-[40px] justify-center items-center">
            <Pressable
              onPress={() => router.push("profile/notifications")}
              className="relative"
            >
              <Badge className="absolute -top-[11px] -right-[11px] z-50">
                3
              </Badge>
              <Image
                source={Assets.Icons.bell}
                resizeMode="contain"
                className="w-[20px] h-[20px]"
              />
            </Pressable>
          </View>
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
            <Text className="font-Poppins-Regular text-[#eef2f7] text-[12px] mt-[2px]">
              Register: {moment(user?.createdAt).format("MMM DD, YYYY")}
            </Text>
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
              {item?.name === "Notifications" && <Badge className="">3</Badge>}
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
        Version: beta - 1.0.0
      </Text>
    </SafeAreaView>
  );
};

export default ProfileScreen;
