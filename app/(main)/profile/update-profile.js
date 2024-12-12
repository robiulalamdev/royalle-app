import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  Pressable,
} from "react-native";
import React, { useCallback, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useFocusEffect, useRouter } from "expo-router";
import { pickImageFromGallery } from "../../../lib/services";
import { Assets } from "../../../lib/assets";
import { useSelector } from "react-redux";
import ProfileImage from "../../../components/common/auth/ProfileImage";
import { Button } from "react-native-paper";
import { useUpdateUserMutation } from "../../../redux/features/user/userApi";
import { useToast } from "react-native-toast-notifications";

const updateProfileScreen = () => {
  const { user } = useSelector((state) => state.user);
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({});

  const toast = useToast();

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const [image, setImage] = useState(null);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validate()) {
      const formData = new FormData();

      if (form?.name) {
        formData.append("name", form.name);
      }
      if (form?.email) {
        formData.append("email", form.email);
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

      const result = await updateUser(options);
      if (result?.data?.success) {
        toast.show("Profile updated successfully", { type: "success" });
      } else {
        if (result?.data?.type === "email") {
          setErrors({ name: "", email: "Email already in use" });
        }
      }
    }
  };

  const handleInputImage = async () => {
    const result = await pickImageFromGallery();
    if (result?.success) {
      setImage(result);
    } else {
      Alert.alert("Error", result.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (user) {
        setForm({ name: user?.name, email: user?.email });
      }

      return () => {};
    }, [user])
  );

  return (
    <SafeAreaView className="bg-black h-full flex-1 px-[20px] py-[32px]">
      <StatusBar style="light" />
      <View className="flex-row items-center justify-between w-full h-[50px]">
        <Pressable onPress={() => router.back()}>
          <Image
            source={require("../../../assets/images/message/inbox/leftArrow.png")}
            className="w-[40px] h-[40px]"
          />
        </Pressable>
        <Text className="text-white font-medium leading-[18px]">Profile</Text>
        <View className="w-[40px] h-[40px]"></View>
      </View>

      <View className="flex-1 p-6">
        <TouchableOpacity
          onPress={() => handleInputImage()}
          className="w-[120px] h-[120px] rounded-full justify-center items-center mx-auto relative"
        >
          {image?.uri ? (
            <Image
              source={{ uri: image?.uri }}
              resizeMode="cover"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <ProfileImage
              url={user?.image}
              className="w-full h-full object-cover rounded-full"
            />
          )}

          <View className="w-full h-full absolute top-0 bottom-0 right-0 left-0 justify-center items-center bg-black/20 rounded-full">
            <Image
              source={Assets.Icons.camera}
              className="w-[35px] h-[35px] object-contain"
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>

        <View className="mt-6">
          <View>
            <Text className="text-[14px] font-Lato-Medium leading-[20px] text-white mb-[12px]">
              Full Name
            </Text>
            <TextInput
              className="bg-transparent text-white px-4 h-[42px] text-[14px] border-[1px] border-gray-300 rounded-[8px] font-Poppins-Regular mb-2"
              placeholder="Enter your name"
              placeholderTextColor="#9CA3AF"
              value={form.name}
              onChangeText={(text) => setForm({ ...form, name: text })}
            />
            {errors.name && (
              <Text className="text-red-500 text-[12px] font-Poppins-Regular">
                {errors.name}
              </Text>
            )}
          </View>

          {/* Email Input */}
          <View className="mt-[16px]">
            <Text className="text-[14px] font-Lato-Medium leading-[20px] text-white mb-[12px]">
              Email
            </Text>
            <TextInput
              className="bg-transparent text-white px-4 h-[42px] text-[14px] border-[1px] border-gray-300 rounded-[8px] font-Poppins-Regular mb-2"
              placeholder="Enter your email"
              placeholderTextColor="#9CA3AF"
              value={form.email}
              onChangeText={(text) => setForm({ ...form, email: text })}
              keyboardType="email-address"
            />
            {errors.email && (
              <Text className="text-red-500 text-[12px] font-Poppins-Regular">
                {errors.email}
              </Text>
            )}
          </View>

          {/* Submit Button */}
          <Button
            disabled={isLoading}
            loading={isLoading}
            className="bg-primary rounded-md mt-4"
            onPress={handleSubmit}
          >
            <Text className="text-white text-center font-bold">Submit</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default updateProfileScreen;
