import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useSearchMatchesMutation } from "../../../redux/features/user/userApi";
import { ActivityIndicator } from "react-native-paper";
import FilterSidebar from "../../../components/common/modals/FilterSidebar";
import FriendCard from "../../../components/common/items/FriendCard";
import { SCREEN_HEIGHT } from "../../../helpers/common";
import { Pressable } from "react-native";
import { useSelector } from "react-redux";
import ProfileImage from "../../../components/common/auth/ProfileImage";

const SearchScreen = () => {
  const { user } = useSelector((state) => state.user);
  const router = useRouter();
  const [searchMatches] = useSearchMatchesMutation();
  const [query, setQuery] = useState("");

  const [matches, setMatches] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const refetch = async () => {
    const options = {
      data: { query: query || "" },
    };
    const result = await searchMatches(options);
    if (result?.data?.success) {
      setMatches(result?.data?.data);
    }
    setIsLoading(false);
  };

  // Function to handle refresh
  const onRefresh = () => {
    setRefreshing(true);
    refetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  useEffect(() => {
    setIsLoading(true);
    refetch();
  }, [query]);

  return (
    <View className="bg-black h-full flex-1 px-[20px]">
      <View className="flex-row justify-between items-center w-full pt-[50px]">
        <Pressable onPress={() => setIsVisible(!isVisible)}>
          <Image
            className="w-[40px] h-[40px]"
            source={require("../../../assets/icons/global/menu.png")}
            width={40}
            height={40}
          />
        </Pressable>
        <Image
          className="flex-grow max-w-[148px] max-h-[28px]"
          source={require("../../../assets/brand/logo.png")}
          resizeMode="contain"
        />

        <TouchableOpacity onPress={() => router.push("profile")}>
          <ProfileImage
            className="w-[40px] h-[40px] rounded-full"
            url={user?.image}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {isLoading && (
          <View
            className="flex-col justify-center items-center"
            style={{ height: SCREEN_HEIGHT - 100 }}
          >
            <ActivityIndicator size="small" color="white" />
          </View>
        )}
        {!isLoading && matches?.length > 0 && (
          <View className="flex-1">
            <>
              {matches.map((match, index) => (
                <FriendCard key={index} item={match} className="mt-0" />
              ))}
            </>
          </View>
        )}
        {!isLoading && matches?.length === 0 && (
          <View
            className="flex-col justify-center items-center"
            style={{ height: SCREEN_HEIGHT - 100 }}
          >
            <Text className="text-[18px] font-Poppins-Regular text-white">
              No matches found
            </Text>
          </View>
        )}
      </ScrollView>
      <FilterSidebar
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        setQuery={setQuery}
      />
    </View>
  );
};

export default SearchScreen;
