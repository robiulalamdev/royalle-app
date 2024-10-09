import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useEffect, useState } from "react";

export default function GoogleLogin() {
  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setState({ userInfo, error: undefined });
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            // user cancelled the login flow
            break;
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };

  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "700335429348-5d6022sbfehjfaegvt2bnlas2t7s44pb.apps.googleusercontent.com",
    });
  }, []);

  const signin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      console.log(user);
      setUserInfo(user);
      setError();
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };

  //   const logout = () => {
  //     setUserInfo();
  //     GoogleSignin.revokeAccess();
  //     GoogleSignin.signOut();
  //   };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => _signIn()}
        className="px-[20px] py-[10px] bg-white rounded-[32px] mt-[16px] flex-row justify-center items-center"
      >
        <Image
          source={require("../../assets/icons/auth/google.png")}
          resizeMode="contain"
          className="w-[30px] h-[30px] mr-3"
        />
        <Text className="text-center font-medium text-black leading-[24px] text-[16px]">
          Login with Google
        </Text>
      </Pressable>
      {/* 
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Standard}
        color={GoogleSigninButton.Color.Dark}
        onPress={signin}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
