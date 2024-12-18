import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../redux/store";
import Route from "../routes/route";
import { PaperProvider } from "react-native-paper";
import { useFonts } from "expo-font";
import "../styles/global.css";
import "react-native-reanimated";
import { ToastProvider } from "react-native-toast-notifications";
import { SocketProvider } from "../context/SocketContext";

const RootLayout = () => {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    "Lato-Regular": require("../assets/fonts/lato/Lato-Regular.ttf"),
    "Lato-Bold": require("../assets/fonts/lato/Lato-Bold.ttf"),
    "Lato-SemiBold": require("../assets/fonts/lato/Lato-SemiBold.ttf"),
    "Lato-Medium": require("../assets/fonts/lato/Lato-Medium.ttf"),
    "Archivo-Regular": require("../assets/fonts/archivo/Archivo-Regular.ttf"),

    // inter
    "Inter-Regular": require("../assets/fonts/inter/Inter-Regular.otf"),
    "Inter-Medium": require("../assets/fonts/inter/Inter-Medium.otf"),
    "Inter-SemiBold": require("../assets/fonts/inter/Inter-SemiBold.otf"),
    "Inter-Bold": require("../assets/fonts/inter/Inter-Bold.otf"),

    // poppins
    "Poppins-Regular": require("../assets/fonts/poppins/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/poppins/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/poppins/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("../assets/fonts/poppins/Poppins-Bold.ttf"),
  });

  if (!loaded) {
    return <ActivityIndicator />;
  }
  return (
    <Provider store={store}>
      <PaperProvider>
        <ToastProvider>
          <PersistGate
            loading={
              <View>
                <Text>Loading...</Text>
              </View>
            }
            persistor={persistor}
          >
            <SocketProvider>
              <Route />
            </SocketProvider>
          </PersistGate>
        </ToastProvider>
      </PaperProvider>
    </Provider>
  );
};

export default RootLayout;
