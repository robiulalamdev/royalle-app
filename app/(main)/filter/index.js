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

export default function FilterScreen() {
  const { user } = useSelector((state) => state.nonPersisted.user);
  const [gender, setGender] = useState("Male");
  const [locationType, setLocationType] = useState("Mile");
  const [locationValue, setLocationValue] = useState("");
  const router = useRouter();

  return (
    <SafeAreaView className="bg-black h-full flex-1 ">
      <StatusBar style="light" />
      <View className="min-h-[72px] flex-row items-center justify-between w-full">
        <View className="flex-row items-center gap-x-[12px]">
          <Pressable onPress={() => router.back()}>
            <Image
              source={require("../../../assets/icons/filter/backArrow.png")}
              className="w-[40px] h-[40px]"
            />
          </Pressable>
          <Text className="font-medium text-white leading-[28px] text-[20px]">
            Filter Search
          </Text>
        </View>
        {user && user?.image ? (
          <Image
            source={{ uri: user?.image }}
            className="w-[40px] h-[40px] rounded-full object-cover"
            resizeMode="cover"
          />
        ) : (
          <Image
            source={require("../../../assets/images/global/profile.png")}
            className="w-[40px] h-[40px] rounded-full object-cover"
            resizeMode="cover"
          />
        )}
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
        <Microfilters />
        <Pressable className="px-[20px] py-[16px] bg-primary rounded-[28px] mt-[36px] mb-[26px]">
          <Text className="text-center font-medium text-[#010404] leading-[24px] text-[16px]">
            Apply filter
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
