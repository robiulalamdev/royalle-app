import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import ReactNativeModal from "react-native-modal";
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const users = [
  {
    id: 1,
    name: "Rakibul Hasan",
    image:
      "https://www.citrix.com/blogs/wp-content/uploads/2018/03/slack_compressed-e1521621363404-360x360.jpg",
    password: "1234",
    email: "rakibulhasan@gmail.com",
  },
  {
    id: 2,
    name: "Motakabbir Rahman",
    image:
      "https://bauet.ac.bd/eee/wp-content/uploads/sites/8/2020/12/Md.-Motakabbir-Rahman-1-scaled.jpg",
    password: "1234",
    email: "mota.abir@gmail.com",
  },
  {
    id: 3,
    name: "Robiul Alam",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/17/BD_Flag.png",
    password: "1234",
    email: "robiulalam7600@gmail.com",
  },
];

export default function LoginWithTinderPopup({
  isVisible,
  onClose,
  handleFinish,
}) {
  return (
    <ReactNativeModal
      isVisible={isVisible}
      onSwipeComplete={() => onClose(false)}
      swipeDirection="down"
      onModalWillHide={() => onClose(false)}
      onBackButtonPress={() => onClose(false)}
      deviceWidth={deviceWidth}
      deviceHeight={deviceHeight}
      backdropColor="transparent"
      coverScreen={true}
    >
      <Image
        source={require("../../../assets/images/auth/tinderbg.jpg")}
        resizeMode="cover"
        className="h-full w-full rounded-[32px]"
      />
      <View className="px-[12px] py-2 flex-1 w-full h-full justify-center items-center absolute top-0 bottom-0">
        <View className="w-full h-full">
          <Image
            source={require("../../../assets/images/initial/tinder.png")}
            resizeMode="contain"
            className="w-[160px] h-[100px] mx-auto"
          />

          <View className="mt-[62px] bg-white border border-gray-100 p-[12px] rounded-[32px]">
            {users.map((user, index) => (
              <TouchableOpacity
                onPress={() => handleFinish(user)}
                key={index}
                className="flex-row items-center gap-[12px] mb-[22px]"
              >
                <Image
                  source={{ uri: user.image }}
                  resizeMode="cover"
                  className="w-[50px] h-[50px] rounded-full"
                />
                <View>
                  <Text className="text-[16px] font-bold text-black leading-normal font-poppins">
                    {user.name}
                  </Text>
                  <Text className="text-[14px] text-gray-500">
                    {user.email}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </ReactNativeModal>
  );
}

const styles = StyleSheet.create({});
