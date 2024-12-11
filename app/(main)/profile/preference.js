import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useRouter } from "expo-router";
import GenderInput from "../../../components/filter/GenderInput";
import Microfilters from "../../../components/filter/Microfilters";
import { useSelector } from "react-redux";
import AgeInput from "../../../components/common/forms/AgeInput";
import HeightInput from "../../../components/common/forms/HeightInput";
import { useUpdateUserInfoMutation } from "../../../redux/features/user/userApi";
import { useToast } from "react-native-toast-notifications";

const PreferenceScreen = () => {
  const { user } = useSelector((state) => state.user);
  const router = useRouter();
  const toast = useToast();

  const [updateUserInfo] = useUpdateUserInfoMutation();

  const [isLoading, setIsLoading] = useState(false);

  const [open, setOpen] = useState(true);
  const [gender, setGender] = useState("");
  const [eyeColor, setEyeColor] = useState("");
  const [hairColor, setHairColor] = useState("");
  const [likes, setLikes] = useState("");
  const [looking, setLooking] = useState("");
  const [preferences, setPreferences] = useState([]);
  const [ageRange, setAgeRange] = useState([1]);
  const [height, setHeight] = useState([1]);

  const handleUpdate = async () => {
    const newData = {};

    if (ageRange?.length === 0) {
      toast.show("Age is required", { type: "warning" });
      return;
    } else {
      newData["age"] = ageRange[0];
    }
    if (height?.length === 0) {
      toast.show("Height is required", { type: "warning" });
      return;
    } else {
      newData["height"] = height[0];
    }

    if (!gender) {
      toast.show("Gender is required", { type: "warning" });
      return;
    } else {
      newData["gender"] = gender;
    }

    if (!eyeColor) {
      toast.show("Eye color is required", { type: "warning" });
      return;
    } else {
      newData["eyeColor"] = eyeColor;
    }

    if (!hairColor) {
      toast.show("Hair color is required", { type: "warning" });
      return;
    } else {
      newData["hairColor"] = hairColor;
    }

    if (!likes) {
      toast.show("Likes is required", { type: "warning" });
      return;
    } else {
      newData["likes"] = likes;
    }

    if (!looking) {
      toast.show("Looking is required", { type: "warning" });
      return;
    } else {
      newData["lookingFor"] = looking;
    }

    if (preferences?.length === 0) {
      toast.show("Preferences is required", { type: "warning" });
      return;
    } else {
      newData["preferences"] = preferences;
    }

    setIsLoading(true);
    const options = {
      data: newData,
    };

    const result = await updateUserInfo(options);
    if (result?.data?.success) {
      toast.show("Preference updated successfully", { type: "success" });
    } else {
      toast.show("Preference updated unsuccessfully", { type: "danger" });
    }
    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      if (user) {
        if (user?.gender) {
          setGender(user?.gender);
        }
        if (user?.eyeColor) {
          setEyeColor(user?.eyeColor);
        }
        if (user?.age) {
          setAgeRange([user?.age]);
        }
        if (user?.height) {
          setHeight([user?.height]);
        }
        if (user?.preferences) {
          setPreferences(user?.preferences);
        }
        if (user?.hairColor) {
          setHairColor(user?.hairColor);
        }
        if (user?.likes) {
          setLikes(user?.likes);
        }
        if (user?.lookingFor) {
          setLooking(user?.lookingFor);
        }
      }

      return () => {};
    }, [user])
  );

  return (
    <SafeAreaView className="bg-black h-full flex-1 ">
      <StatusBar style="light" />
      <View className="min-h-[72px] flex-row items-center justify-between w-full">
        <Pressable onPress={() => router.back()}>
          <Image
            source={require("../../../assets/icons/filter/backArrow.png")}
            className="w-[40px] h-[40px]"
          />
        </Pressable>

        <Text className="font-medium text-white leading-[28px] text-[20px]">
          Preference
        </Text>
        <View className="w-[40px] h-[40px]"></View>
      </View>

      <ScrollView
        alwaysBounceVertical={true}
        showsVerticalScrollIndicator={true}
        className="w-full px-[12px] mt-[32px]"
      >
        <AgeInput ageRange={ageRange} setAgeRange={setAgeRange} />
        <HeightInput values={height} setValues={setHeight} />
        <GenderInput gender={gender} setGender={setGender} />
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
          showArrow={false}
        />
        <Pressable
          disabled={isLoading}
          onPress={() => handleUpdate()}
          className="px-[20px] py-[16px] bg-primary rounded-[28px] mt-[36px] mb-[26px]"
        >
          <Text className="text-center font-medium text-[#010404] leading-[24px] text-[16px]">
            {isLoading ? "Updating..." : "Update"}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PreferenceScreen;
