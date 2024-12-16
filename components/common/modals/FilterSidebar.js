import Modal from "react-native-modal";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../helpers/common";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import AgeRange from "../../../components/filter/AgeRange";
import HeightRange from "../../../components/filter/HeightRange";
import GenderInput from "../../../components/filter/GenderInput";
import LocationInput from "../../../components/filter/LocationInput";
import Microfilters from "../../../components/filter/Microfilters";
import { useSelector } from "react-redux";
import ProfileImage from "../auth/ProfileImage";

const FilterSidebar = ({ isVisible, setIsVisible }) => {
  const { user } = useSelector((state) => state.user);
  const [gender, setGender] = useState("Male");
  const [locationType, setLocationType] = useState("Mile");
  const [locationValue, setLocationValue] = useState("");
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const [eyeColor, setEyeColor] = useState("#A37042");
  const [hairColor, setHairColor] = useState("#222222");
  const [likes, setLikes] = useState("Workout");
  const [looking, setLooking] = useState("Long term");
  const [preferences, setPreferences] = useState(["Drinking"]);

  return (
    <Modal
      className="flex-1 w-full h-full"
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
      deviceWidth={SCREEN_WIDTH}
      deviceHeight={SCREEN_HEIGHT}
      isVisible={isVisible}
      onBackButtonPress={() => setIsVisible && setIsVisible(false)}
      onBackdropPress={() => setIsVisible && setIsVisible(false)}
      backdropColor="transparent"
      hasBackdrop={true}
    >
      <SafeAreaView className="bg-black h-full flex-1 relative -left-[25px] px-[20px] pb-[20px]">
        <View className="flex-row items-center justify-between w-full">
          <View className="flex-row items-center gap-x-[12px]">
            <Pressable onPress={() => setIsVisible(false)}>
              <Image
                source={require("../../../assets/icons/filter/backArrow.png")}
                className="w-[40px] h-[40px]"
              />
            </Pressable>
            <Text className="font-medium text-white leading-[28px] text-[20px]">
              Filter Search
            </Text>
          </View>
          <ProfileImage
            url={user?.image}
            className="w-[40px] h-[40px] rounded-full object-cover"
            resizeMode="cover"
          />
        </View>

        <ScrollView
          alwaysBounceVertical={true}
          showsVerticalScrollIndicator={true}
          className="w-full px-[12px] mt-[32px]"
        >
          <AgeRange />
          <HeightRange />
          <GenderInput gender={gender} setGender={setGender} />
          <LocationInput
            locationType={locationType}
            setLocationType={setLocationType}
            locationValue={locationValue}
            setLocationValue={setLocationValue}
          />
          <Microfilters
            open={open}
            setOpen={setOpen}
            eyeColor={eyeColor}
            setEyeColor={setEyeColor}
            hairColor={hairColor}
            setHairColor={setHairColor}
            likes={likes}
            setLikes={setLikes}
            looking={looking}
            setLooking={setLooking}
            preferences={preferences}
            setPreferences={setPreferences}
          />

          <Pressable className="px-[20px] py-[16px] bg-primary rounded-[28px] mt-[36px] mb-[26px]">
            <Text className="text-center font-medium text-[#010404] leading-[24px] text-[16px]">
              Apply filter
            </Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export default FilterSidebar;
