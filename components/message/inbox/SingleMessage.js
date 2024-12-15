import { StyleSheet, Text, View } from "react-native";
import ProfileImage from "../../common/auth/ProfileImage";
import { useSelector } from "react-redux";

export default function SingleMessage({ data = null, chat = null }) {
  const { user } = useSelector((state) => state.user);
  return (
    <View className="w-full">
      {data?.senderId !== user?._id ? (
        <View className="flex-row items-end gap-x-[12px] mt-[24px]">
          <ProfileImage
            url={chat?.receiverInfo?.image}
            className="w-[40px] h-[40px] rounded-full"
            resizeMode="cover"
          />
          <View className="bg-primary px-[16px] py-[12px] rounded-[24px_24px_24px_0px] max-w-[75%]">
            <Text
              className="text-[#010101] text-[14px] leading-[20px] font-normal"
              style={{ fontFamily: "Poppins-Regular" }}
            >
              {data?.message}
            </Text>
          </View>
        </View>
      ) : (
        <View className="w-[100%] flex-row justify-end mt-[24px]">
          <View className="bg-[#FFFFFF1F] px-[16px] py-[12px] rounded-[24px_24px_0px_24px] max-w-[75%]">
            <Text
              className="text-white text-[14px] leading-[20px] font-normal"
              style={{ fontFamily: "Poppins-Regular" }}
            >
              {data?.message}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
