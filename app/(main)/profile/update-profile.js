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

const updateProfileScreen = () => {
  const { user } = useSelector((state) => state.user);
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({});

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

  const handleSubmit = () => {
    if (validate()) {
      Alert.alert("Success", `Name: ${form.name}, Email: ${form.email}`);
      setForm({ name: "", email: "" });
    }
  };

  const [imageUri, setImageUri] = useState(null);

  const handleInputImage = async () => {
    const result = await pickImageFromGallery();
    if (result?.success) {
      setImageUri(result?.uri);
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

  console.log(user);

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
          <Image
            source={
              imageUri
                ? { uri: imageUri }
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

        <View className="mt-6">
          <View>
            <Text className="text-[16px] font-Lato-Medium leading-[20px] text-white mb-[12px]">
              Full Name
            </Text>
            <TextInput
              className="bg-transparent text-white px-4 py-[10px] border border-gray-200 rounded-md mb-2"
              placeholder="Enter your name"
              placeholderTextColor="#9CA3AF"
              value={form.name}
              onChangeText={(text) => setForm({ ...form, name: text })}
            />
            {errors.name && <Text className="text-red-500">{errors.name}</Text>}
          </View>

          {/* Email Input */}
          <View className="mt-[16px]">
            <Text className="text-[16px] font-Lato-Medium leading-[20px] text-white mb-[12px]">
              Email
            </Text>
            <TextInput
              className="bg-transparent text-white px-4 py-[10px] border border-gray-200 rounded-md mb-2"
              placeholder="Enter your email"
              placeholderTextColor="#9CA3AF"
              value={form.email}
              onChangeText={(text) => setForm({ ...form, email: text })}
              keyboardType="email-address"
            />
            {errors.email && (
              <Text className="text-red-500">{errors.email}</Text>
            )}
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            className="bg-primary p-4 rounded-md mt-4"
            onPress={handleSubmit}
          >
            <Text className="text-white text-center font-bold">Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default updateProfileScreen;
