import { Button, Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import Carousel from "react-native-snap-carousel";
import { homeItems } from "../../constants/data";
import { wp } from "../../helpers/common";
import CarouselSingleItem from "./CarouselSingleItem";

export default function HomeCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  const handleNextItem = () => {
    const newIndex = (activeIndex + 1) % homeItems.length;
    carouselRef.current.snapToItem(newIndex);
    setActiveIndex(newIndex);
  };

  const handlePrevItem = () => {
    const newIndex = (activeIndex - 1 + homeItems.length) % homeItems.length;
    carouselRef.current.snapToItem(newIndex);
    setActiveIndex(newIndex);
  };
  return (
    <>
      <View className="mt-[16px]">
        <Carousel
          ref={carouselRef}
          data={homeItems}
          renderItem={CarouselSingleItem}
          sliderWidth={wp(90)}
          itemWidth={wp(90)}
          onSnapToItem={(index) => setActiveIndex(index)}
          className="mx-auto"
        />
      </View>

      <View className="mt-[28px] flex-row justify-between items-center gap-x-[10px]">
        <Pressable onPress={handlePrevItem}>
          <Image
            source={require("../../assets/icons/home/left.png")}
            className="w-[40px] h-[40px]"
          />
        </Pressable>
        <Pressable>
          <Image
            source={require("../../assets/icons/home/reload.png")}
            className="w-[48px] h-[48px]"
          />
        </Pressable>
        <Pressable onPress={() => router.push("filter")}>
          <Image
            source={require("../../assets/icons/home/love.png")}
            className="w-[48px] h-[48px]"
          />
        </Pressable>
        <Pressable>
          <Image
            source={require("../../assets/icons/home/message.png")}
            className="w-[48px] h-[48px]"
          />
        </Pressable>
        <Pressable onPress={handleNextItem}>
          <Image
            source={require("../../assets/icons/home/right.png")}
            className="w-[40px] h-[40px]"
          />
        </Pressable>
      </View>
    </>
  );
}
