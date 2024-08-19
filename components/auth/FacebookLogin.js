import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import {
  getAuth,
  signInWithCredential,
  FacebookAuthProvider,
} from "firebase/auth";
import app from "../../config/firebaseConfig";

const FacebookLogin = () => {
  const auth = getAuth(app);
  const signInWithFB = async () => {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      "public_profile",
      //   "email",
    ]);
    // LoginManager.logInWithReadPermissions(["public_profile"]).then(
    //   (result: LoginResult) => {
    //     console.log(LoginResult);
    //   }
    // );

    console.log(result);
    if (result.isCancelled) {
      throw "User cancelled the login process";
    }
    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw "Something went wrong obtaining access token";
    }

    // Create a Firebase credential with the AccessToken
    const facebookAuthProvider = FacebookAuthProvider.credential(
      data.accessToken
    );
    // console.log("provider ",facebookAuthProvider);
    // const credential = facebookAuthProvider.credential(data.accessToken);
    // Sign-in with credential from the Facebook user.
    signInWithCredential(auth, facebookAuthProvider)
      .then(() => {})
      .catch((error) => {
        // Handle Errors here.]
        console.log(error);
      });
  };

  return (
    <View style={{ minHeight: 400 }}>
      <Button title="Sign In With FB" onPress={() => signInWithFB()} />
      {/* <LoginButton
        onLoginFinished={(error, result) => {
          if (error) {
            console.log("login has error: " + result.error);
          } else if (result.isCancelled) {
            console.log("login is cancelled.");
          } else {
            AccessToken.getCurrentAccessToken().then((data) => {
              console.log(data.accessToken.toString());
            });
          }
        }}
        onLogoutFinished={() => console.log("logout.")}
      /> */}
    </View>
  );
};

export default FacebookLogin;

const styles = StyleSheet.create({});
