import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import { useEffect, useState } from "react";

export default function GoogleLogin() {
  //   const [error, setError] = useState(null);
  //   const [userInfo, setUserInfo] = useState(null);

  //   useEffect(() => {
  //     GoogleSignin.configure({
  //       webClientId:
  //         "700335429348-5d6022sbfehjfaegvt2bnlas2t7s44pb.apps.googleusercontent.com",
  //     });
  //   }, []);

  //   const signin = async () => {
  //     try {
  //       await GoogleSignin.hasPlayServices();
  //       const user = await GoogleSignin.signIn();
  //       setUserInfo(user);
  //       setError();
  //     } catch (e) {
  //       setError(e);
  //     }
  //   };

  //   const logout = () => {
  //     setUserInfo();
  //     GoogleSignin.revokeAccess();
  //     GoogleSignin.signOut();
  //   };

  return (
    <View style={styles.container}>
      {/* <Text>{JSON.stringify(error)}</Text>
      {userInfo && <Text>{JSON.stringify(userInfo.user)}</Text>}
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Standard}
        color={GoogleSigninButton.Color.Dark}
        onPress={signin}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 400,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
