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
import React, { useEffect, useState } from "react";
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
import { USER_GENDERS } from "../../../constants/data";

const FilterSidebar = ({ isVisible, setIsVisible }) => {
  const { user } = useSelector((state) => state.user);
  const [locationType, setLocationType] = useState("Mile");
  const [locationValue, setLocationValue] = useState("");
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const [gender, setGender] = useState("");
  const [ageRange, setAgeRange] = useState([31, 35]);
  const [heightRange, setHeightRange] = useState([48]);
  const [eyeColor, setEyeColor] = useState("");
  const [hairColor, setHairColor] = useState("");
  const [likes, setLikes] = useState("");
  const [looking, setLooking] = useState("");
  const [preferences, setPreferences] = useState([]);

  const handleFilter = () => {
    const queryParams = {};

    if (gender) queryParams.gender = gender;
    if (ageRange[0] && ageRange[1])
      queryParams.ages = `${ageRange[0]}-${ageRange[1]}`;
    if (heightRange[0]) queryParams.height = heightRange[0];
    if (eyeColor) queryParams.eyeColor = eyeColor;
    if (hairColor) queryParams.hairColor = hairColor;
    if (likes) queryParams.likes = likes;
    if (looking) queryParams.looking = looking;
    if (preferences.length > 0) queryParams.preferences = preferences.join(",");

    // Convert the queryParams object into a query string
    const queryString = Object.entries(queryParams)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");

    setIsVisible(false);
    if (queryParams) {
      router.push(`/search/${queryString}`);
    }
  };

  useEffect(() => {
    if (user?.gender) {
      if (user.gender === USER_GENDERS.MALE) {
        setGender(USER_GENDERS.FEMALE);
      } else {
        setGender(USER_GENDERS.MALE);
      }
    }
  }, [user]);

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
          <AgeRange ageRange={ageRange} setAgeRange={setAgeRange} />
          <HeightRange
            heightRange={heightRange}
            setHeightRange={setHeightRange}
          />
          <GenderInput gender={gender} setGender={setGender} />
          {/* <LocationInput
            locationType={locationType}
            setLocationType={setLocationType}
            locationValue={locationValue}
            setLocationValue={setLocationValue}
          /> */}
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

          <Pressable
            onPress={() => handleFilter()}
            className="px-[20px] py-[16px] bg-primary rounded-[28px] mt-[36px] mb-[26px]"
          >
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
