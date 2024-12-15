import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";

const HomeScreen = () => {
  return (
    <View style={[styles.container]}>
      <ScrollView contentContainerStyle={{ gap: 15 }}>
        <Text>Home</Text>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
  },
});
