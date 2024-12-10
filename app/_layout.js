import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../redux/store";
import Route from "../routes/route";
import { PaperProvider } from "react-native-paper";

const RootLayout = () => {
  const [fontsLoaded] = useFonts({ PoppinsRegular: Poppins_400Regular });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }
  return (
    <Provider store={store}>
      <PaperProvider>
        <PersistGate
          loading={
            <View>
              <Text>Loading...</Text>
            </View>
          }
          persistor={persistor}
        >
          <Route />
        </PersistGate>
      </PaperProvider>
    </Provider>
  );
};

export default RootLayout;
