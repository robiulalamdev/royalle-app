import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/user/userSlice";
// import FacebookLogin from "../../components/auth/FacebookLogin";
// import GoogleLogin from "../../components/auth/GoogleLogin";
import { Settings } from "react-native-fbsdk-next";
import LoginWithTinderPopup from "../../components/common/auth/LoginWithTinderPopup";

export default function LoginScreen() {
  const { user } = useSelector((state) => state.nonPersisted.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const [showTinderLoginPopup, setShowTinderLoginPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    dispatch(
      setUser({ name: "username", email: "nahid@gmail.com", password: "1234" })
    );
    router.push("(main)");
  };

  useEffect(() => {
    const initializeFacebookSDK = async () => {
      try {
        await Settings.initializeSDK();
        console.log("Facebook SDK initialized successfully.");
      } catch (error) {
        console.error("Error initializing Facebook SDK:", error);
      }
    };

    initializeFacebookSDK();
  }, []);

  const handleTinderLogin = async (loggedUser) => {
    setIsLoading(true);
    setShowTinderLoginPopup(false);
    dispatch(setUser({ ...loggedUser }));
    setTimeout(() => {
      setIsLoading(false);
      router.push("(main)");
    }, 3000);
  };
  return (
    <>
      <SafeAreaView className="bg-black px-[12px] py-2 flex-1 w-full h-full justify-center items-center">
        <View className="w-full px-4">
          <Text className="text-center font-medium text-white leading-[24px] text-[32px] py-4">
            Log in
          </Text>
          <TextInput
            placeholder="Email"
            className="flex-grow text-white text-[13px] placeholder:!text-white border border-gray-400 px-3 h-[48px] rounded-[6px]"
            placeholderTextColor="gray"
            style={{ fontFamily: "PoppinsMedium" }}
          />
          <TextInput
            placeholder="Password"
            className="flex-grow text-white text-[13px] placeholder:!text-white border border-gray-400 px-3 h-[48px] rounded-[6px] mt-6"
            placeholderTextColor="gray"
            style={{ fontFamily: "PoppinsMedium" }}
          />
          <Text className="text-left mt-1 font-normal text-white leading-[24px] text-[14px]">
            Forgot Password
          </Text>
          <Pressable
            onPress={() => handleLogin()}
            className="px-[20px] py-[12px] bg-primary rounded-[6px] mt-[36px]"
          >
            <Text className="text-center font-medium text-[#010404] leading-[24px] text-[16px]">
              Login
            </Text>
          </Pressable>

          <View className="mt-[36px]">
            <Pressable
              onPress={() => router.push("bumble")}
              className="px-[20px] py-[10px] bg-yellow-600 rounded-[32px] flex-row justify-center items-center"
            >
              <Image
                source={require("../../assets/images/auth/bumbleLogo.png")}
                resizeMode="contain"
                width={30}
                height={30}
                className="w-[30px] h-[30px] mr-3"
              />
              <Text className="text-center font-medium text-[#010404] leading-[24px] text-[16px]">
                Login with Bumble
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setShowTinderLoginPopup(true)}
              // onPress={() => router.push("(auth)/tinder")}
              className="px-[20px] py-[10px] bg-white rounded-[32px] mt-[16px] flex-row justify-center items-center"
            >
              <Image
                source={require("../../assets/images/auth/tinderLogo.png")}
                resizeMode="contain"
                width={30}
                height={30}
                className="w-[30px] h-[30px] mr-3"
              />
              <Text className="text-center font-medium text-black leading-[24px] text-[16px]">
                Login with tinder
              </Text>
            </Pressable>
            {/* <FacebookLogin /> */}
            {/* <GoogleLogin /> */}
          </View>
        </View>
      </SafeAreaView>
      {showTinderLoginPopup && (
        <LoginWithTinderPopup
          isVisible={showTinderLoginPopup}
          onClose={setShowTinderLoginPopup}
          handleFinish={handleTinderLogin}
        />
      )}

      {isLoading && (
        <View className="w-full h-full absolute top-0 left-0 bottom-0 right-0 bg-white/50 justify-center items-center">
          <ActivityIndicator size={"large"} />
        </View>
      )}
    </>
  );
}
