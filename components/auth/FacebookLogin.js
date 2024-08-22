import { Button, Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  LoginManager,
  AccessToken,
  LoginButton,
} from "react-native-fbsdk-next";
import {
  getAuth,
  signInWithCredential,
  FacebookAuthProvider,
} from "firebase/auth";
import app from "../../config/firebaseConfig";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/user/userSlice";
import { router } from "expo-router";

const FacebookLogin = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();

  async function fetchFacebookUserInfo(accessToken) {
    try {
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,email,picture.type(large)`
      );
      const userInfo = await response.json();
      const userData = {
        name: userInfo?.name || null,
        email: userInfo?.email || null,
        image: userInfo?.picture?.data?.url || "",
        provider: "Facebook",
        user_type: "Social",
        password: null,
      };
      if (userData) {
        await dispatch(setUser(userData));
        setTimeout(() => {
          router.push("(main)");
        }, 500);
      }
    } catch (error) {
      console.error("Failed to fetch Facebook user info:", error);
    }
  }

  const signInWithFB = async () => {
    const result = await LoginManager.logInWithPermissions([
      "public_profile",
      "email",
    ]);
    if (result.isCancelled) {
      throw "User cancelled the login process";
    }

    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw "Something went wrong obtaining access token";
    }

    // Create a Firebase credential with the AccessToken
    const facebookAuthProvider = FacebookAuthProvider.credential(
      data.accessToken
    );
    if (data?.accessToken) {
      await fetchFacebookUserInfo(data?.accessToken);
    }
    signInWithCredential(auth, facebookAuthProvider)
      .then((data) => {
        console.log("facebookL: ", data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View>
      <Pressable
        onPress={() => signInWithFB()}
        className="px-[20px] py-[10px] bg-white rounded-[32px] mt-[16px] flex-row justify-center items-center"
      >
        <Image
          source={require("../../assets/icons/auth/facebook.png")}
          resizeMode="contain"
          className="w-[30px] h-[30px] mr-3"
        />
        <Text className="text-center font-medium text-black leading-[24px] text-[16px]">
          Login with Facebook
        </Text>
      </Pressable>
    </View>
  );
};

export default FacebookLogin;

const styles = StyleSheet.create({});
