import { View, Text, ScrollView, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useSearchMatchesMutation } from "../../../redux/features/user/userApi";
import { Button } from "react-native-paper";
import FilterSidebar from "../../../components/common/modals/FilterSidebar";
import Header from "../../../components/shared/Header";
import FriendCard from "../../../components/common/items/FriendCard";

const SearchScreen = () => {
  const { query } = useLocalSearchParams();
  const [searchMatches] = useSearchMatchesMutation();

  const [matches, setMatches] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const refetch = async () => {
    const options = {
      data: { query: query },
    };
    const result = await searchMatches(options);
    if (result?.data?.success) {
      setMatches(result?.data?.data);
    }
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
    if (query) {
      refetch();
    }
  }, [query]);

  return (
    <>
      <ScrollView
        className="bg-black h-full flex-1 px-[20px]"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Header isVisible={isVisible} setIsVisible={setIsVisible} />
        <View className="flex-1">
          {matches.map((match, index) => (
            <FriendCard key={index} item={match} className="mt-0" />
          ))}
        </View>
      </ScrollView>
      <FilterSidebar isVisible={isVisible} setIsVisible={setIsVisible} />
    </>
  );
};

export default SearchScreen;
