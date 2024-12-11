import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { Assets } from "../../lib/assets";
import { getMyLocation, pickImageFromGallery } from "../../lib/services";
import {
  useCheckEmailExistMutation,
  useCreateUserMutation,
} from "../../redux/features/user/userApi";
import { useToast } from "react-native-toast-notifications";
import GenderInput from "../../components/filter/GenderInput";
import Microfilters from "../../components/filter/Microfilters";
import AgeInput from "../../components/common/forms/AgeInput";
import HeightInput from "../../components/common/forms/HeightInput";
import { USER_CONFIG } from "../../config";
import { setUser } from "../../redux/features/user/userSlice";

const SignupScreen = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const [checkEmailExist, { isLoading: checkEmailLoading }] =
    useCheckEmailExistMutation();
  const [createUser] = useCreateUserMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [step, setStep] = useState(1);

  const [open, setOpen] = useState(true);
  const [gender, setGender] = useState("");
  const [eyeColor, setEyeColor] = useState("");
  const [hairColor, setHairColor] = useState("");
  const [likes, setLikes] = useState("");
  const [looking, setLooking] = useState("");
  const [preferences, setPreferences] = useState([]);
  const [ageRange, setAgeRange] = useState([33]);
  const [height, setHeight] = useState([4]);

  const [image, setImage] = useState(null);

  const handleSignup = async () => {
    if (ageRange?.length === 0) {
      toast.show("Age is required", { type: "warning" });
      return;
    }
    if (height?.length === 0) {
      toast.show("Height is required", { type: "warning" });
      return;
    }
    if (!gender) {
      toast.show("Gender is required", { type: "warning" });
      return;
    }
    if (!eyeColor) {
      toast.show("Eye color is required", { type: "warning" });
      return;
    }
    if (!hairColor) {
      toast.show("Hair color is required", { type: "warning" });
      return;
    }
    if (!likes) {
      toast.show("Likes is required", { type: "warning" });
      return;
    }
    if (!looking) {
      toast.show("Looking is required", { type: "warning" });
      return;
    }
    if (preferences?.length === 0) {
      toast.show("Preferences is required", { type: "warning" });
      return;
    }

    setIsLoading(true);

    const location = await getMyLocation();
    const formData = new FormData();
    if (!location?.success) {
      Alert.alert(
        "Permission Denied",
        "Permission to access location was denied"
      );
      setIsLoading(false);
      return;
    }

    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("age", ageRange[0]);
    formData.append("height", height[0]);
    formData.append("gender", gender);
    formData.append("eyeColor", eyeColor);
    formData.append("hairColor", hairColor);
    formData.append("likes", likes);
    formData.append("lookingFor", looking);

    for (let i = 0; i < preferences.length; i++) {
      const element = preferences[i];
      formData.append("preferences", element);
    }

    if (location?.success) {
      formData.append("location[coordinates][longitude]", location?.data?.lon);
      formData.append("location[coordinates][latitude]", location?.data?.lat);
      formData.append("location[country]", location?.data?.country);
    }

    if (image?.uri) {
      formData.append("image", {
        uri: image?.uri,
        name: image?.fileName,
        type: image?.mimeType,
      });
    }
    const options = {
      data: formData,
    };
    const result = await createUser(options);
    // console.log(result);
    if (result?.data?.success) {
      if (result?.data?.data?.accessToken) {
        USER_CONFIG.SAVE_TO_STORAGE(
          USER_CONFIG.TOKEN_NAME,
          result?.data?.data?.accessToken
        );
        await dispatch(setUser(result?.data?.data?.user));

        router.push("(main)");
      }
      setIsLoading(false);
    } else {
      setIsLoading(false);
      toast.show("Account created unsuccessfully", { type: "danger" });
    }

    setIsLoading(false);
  };

  const handleInputImage = async () => {
    const result = await pickImageFromGallery();
    if (result?.success) {
      setImage(result);
    } else {
      Alert.alert("Error", result.message);
    }
  };

  const handleEmailExist = async () => {
    if (!name) {
      toast.show("Name is required", { type: "warning" });
      return;
    }
    if (!email) {
      toast.show("Email is required", { type: "warning" });
      return;
    }
    if (!password) {
      toast.show("Password is required", { type: "warning" });
      return;
    }
    const options = {
      data: { email: email },
    };

    const result = await checkEmailExist(options);
    if (result?.data?.success) {
      if (result?.data?.isExist) {
        toast.show("Email already in use", { type: "danger" });
      } else {
        setStep(2);
      }
    } else {
      return toast.show("Something wen wrong", { type: "danger" });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black px-[20px] py-4">
      {step === 1 && (
        <View className="bg-transparent flex-1 w-full h-full justify-center items-center">
          <View>
            <Image
              source={Assets.brands.logo}
              resizeMode="contain"
              className="max-w-[150px] mx-auto"
            />
          </View>
          <Text className="text-center font-Poppins-Medium text-white leading-[24px] text-[18px] my-4">
            Create an account
          </Text>

          <TouchableOpacity
            onPress={() => handleInputImage()}
            className="w-[120px] h-[120px] rounded-full justify-center items-center mx-auto relative"
          >
            <Image
              source={
                image?.uri
                  ? { uri: image?.uri }
                  : { uri: "https://freesvg.org/img/abstract-user-flat-4.png" }
              }
              resizeMode="cover"
              className="w-full h-full object-cover rounded-full"
            />
            <View className="w-full h-full absolute top-0 bottom-0 right-0 left-0 justify-center items-center bg-black/20 rounded-full">
              <Image
                source={Assets.Icons.camera}
                className="w-[35px] h-[35px] object-contain"
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>

          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder="Full Name"
            className="w-full flex-grow text-white text-[13px] placeholder:!text-white border border-gray-400 px-3 max-h-[48px] min-h-[48px] rounded-[6px] mt-[36px]"
            placeholderTextColor="gray"
            style={{ fontFamily: "Poppins-Medium" }}
          />
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            inputMode="email"
            placeholder="Email"
            className="w-full flex-grow text-white text-[13px] placeholder:!text-white border border-gray-400 px-3 max-h-[48px] min-h-[48px] rounded-[6px] mt-6"
            placeholderTextColor="gray"
            style={{ fontFamily: "Poppins-Medium" }}
          />
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Password"
            className="w-full flex-grow text-white text-[13px] placeholder:!text-white border border-gray-400 px-3 max-h-[48px] min-h-[48px] rounded-[6px] mt-6"
            placeholderTextColor="gray"
            style={{ fontFamily: "Poppins-Medium" }}
          />

          <Pressable
            disabled={checkEmailLoading}
            onPress={() => handleEmailExist()}
            className="w-full px-[20px] py-[12px] bg-primary rounded-[6px] mt-[36px]"
          >
            <Text className="text-center font-Poppins-Medium text-[#010404] leading-[24px] text-[16px]">
              {isLoading ? "Submitting..." : "Signup"}
            </Text>
          </Pressable>

          <Text className="text-center font-Poppins-Medium text-white leading-[24px] text-[16px] mt-[24px]">
            OR
          </Text>
          <View className="flex-row items-center justify-center gap-x-[6px] mt-[24px]">
            <Text className="text-center font-Poppins-Medium text-white leading-[24px] text-[16px]">
              Already have an account?
            </Text>
            <Pressable onPress={() => router.push("/login")} className="">
              <Text className="text-center text-white leading-[24px] text-[16px] font-Poppins-Medium">
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      )}

      {step === 2 && (
        <View className="bg-transparent flex-1 w-full h-full">
          <View className="min-h-[72px] flex-row items-center justify-between w-full">
            <View className="min-h-[72px] flex-row items-center justify-between w-full">
              <Pressable onPress={() => setStep(1)}>
                <Image
                  source={Assets.Icons.backArrow}
                  className="w-[40px] h-[40px]"
                />
              </Pressable>

              <Text className="font-medium text-white leading-[28px] text-[20px]">
                Preference
              </Text>
              <View className="w-[40px] h-[40px]"></View>
            </View>
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
              onPress={() => handleSignup()}
              className="px-[20px] py-[16px] bg-primary rounded-[28px] mt-[36px] mb-[26px]"
            >
              <Text className="text-center font-medium text-[#010404] leading-[24px] text-[16px]">
                {isLoading ? "Submitting..." : "Submit"}
              </Text>
            </Pressable>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SignupScreen;
