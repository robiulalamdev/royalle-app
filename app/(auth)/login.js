import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/features/user/userSlice";
import FacebookLogin from "../../components/auth/FacebookLogin";
// import GoogleLogin from "../../components/auth/GoogleLogin";
import { Settings } from "react-native-fbsdk-next";
import { Assets } from "../../lib/assets";
import { usePostLoginMutation } from "../../redux/features/user/userApi";
import { useToast } from "react-native-toast-notifications";
import { USER_CONFIG } from "../../config";

export default function LoginScreen() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useToast();

  const [postLogin, { isLoading }] = usePostLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email) {
      toast.show("Email is required", { type: "warning" });
      return;
    }
    if (!password) {
      toast.show("Password is required", { type: "warning" });
      return;
    }
    const options = {
      data: { email: email, password: password },
    };
    const result = await postLogin(options);
    if (result?.data?.success) {
      if (result?.data?.data?.accessToken) {
        USER_CONFIG.SAVE_TO_STORAGE(
          USER_CONFIG.TOKEN_NAME,
          result?.data?.data?.accessToken
        );
        await dispatch(setUser(result?.data?.data?.user));
        router.push("(main)");
      }
    } else {
      if (result?.data?.type === "password") {
        toast.show("Password not matched", { type: "danger" });
      }
      if (result?.data?.type === "password") {
        toast.show("Password not matched", { type: "danger" });
      }
    }
    if (result?.error?.data?.type === "email") {
      toast.show("User not Found!", { type: "danger" });
    }
  };

  // useEffect(() => {
  //   const initializeFacebookSDK = async () => {
  //     try {
  //       await Settings.initializeSDK();
  //       console.log("Facebook SDK initialized successfully.");
  //     } catch (error) {
  //       console.error("Error initializing Facebook SDK:", error);
  //     }
  //   };

  //   initializeFacebookSDK();
  // }, []);

  return (
    <SafeAreaView className="bg-black px-[12px] py-2 flex-1 w-full h-full justify-center items-center">
      <View className="w-full px-4">
        <View>
          <Image
            source={Assets.brands.logo}
            resizeMode="contain"
            className="max-w-[150px] mx-auto"
          />
        </View>
        <Text className="text-center font-medium text-white leading-[24px] text-[18px] py-4">
          Log in
        </Text>
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
          className="flex-grow text-white text-[13px] placeholder:!text-white border border-gray-400 px-3 h-[48px] rounded-[6px]"
          placeholderTextColor="gray"
          style={{ fontFamily: "Poppins-Medium" }}
        />
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Password"
          className="flex-grow text-white text-[13px] placeholder:!text-white border border-gray-400 px-3 h-[48px] rounded-[6px] mt-6"
          placeholderTextColor="gray"
          style={{ fontFamily: "Poppins-Medium" }}
        />
        <Text className="text-left mt-1 font-normal text-white leading-[24px] text-[14px]">
          Forgot Password
        </Text>
        <Pressable
          disabled={isLoading}
          onPress={() => handleLogin()}
          className="px-[20px] py-[12px] bg-primary rounded-[6px] mt-[36px]"
        >
          <Text className="text-center font-medium text-[#010404] leading-[24px] text-[16px]">
            {isLoading ? "signing..." : "Login"}
          </Text>
        </Pressable>

        {/* <View className="mt-[36px]">
          <FacebookLogin />
          <GoogleLogin />
        </View> */}

        <Text className="text-center text-white leading-[24px] text-[16px] mt-[24px]">
          OR
        </Text>
        <Pressable onPress={() => router.push("/signup")} className="mt-[24px]">
          <Text className="text-center font-medium text-white leading-[24px] text-[16px]">
            Create an account
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
