import { View, Text } from "react-native";
import React, { useState } from "react";
import { Button, TouchableRipple } from "react-native-paper";
import ProfileImage from "../auth/ProfileImage";
import { useRouter } from "expo-router";
import moment from "moment";
import FriendConnectionPopup from "../dialogs/FriendRequestPopup";
import {
  useAcceptFriendRequestMutation,
  useCancelFriendRequestMutation,
  useRejectFriendRequestMutation,
} from "../../../redux/features/friend/friendApi";
import { useToast } from "react-native-toast-notifications";
import { FRIEND_STATUS } from "../../../constants/data";
import { useSelector } from "react-redux";

const FriendListItem = ({ item = {} }) => {
  const { user } = useSelector((state) => state.user);
  const router = useRouter();
  const [rejectFriendRequest] = useRejectFriendRequestMutation();
  const [acceptFriendRequest] = useAcceptFriendRequestMutation();
  const [cancelFriendRequest] = useCancelFriendRequestMutation();

  const toast = useToast();
  const [isRejectLoading, setIsRejectLoading] = useState(false);
  const [isAcceptLoading, setIsAcceptLoading] = useState(false);
  const [isCancelLoading, setIsCancelLoading] = useState(false);

  const [visible, setVisible] = useState(null);

  const goto = async () => {
    console.log("click");
    // router.push("profile/friends/1")
  };

  const handleRejectRequest = async () => {
    setIsRejectLoading(true);
    if (item?._id) {
      const options = {
        id: item?.user?._id,
        data: {},
      };
      const result = await rejectFriendRequest(options);
      if (result?.data?.success) {
        toast.show("Request rejected successfully", { type: "success" });
      } else {
        toast.show("Request rejected unsuccessfully", { type: "danger" });
      }
    }
    setVisible(null);
    setIsRejectLoading(false);
  };

  const handleAcceptRequest = async () => {
    setIsAcceptLoading(true);
    if (item?._id) {
      const options = {
        id: item?._id,
        data: {},
      };
      const result = await acceptFriendRequest(options);
      if (result?.data?.success) {
        toast.show("Request accepted successfully", { type: "success" });
      } else {
        toast.show("Request accepted unsuccessfully", { type: "danger" });
      }
    }
    setVisible(null);
    setIsAcceptLoading(false);
  };

  const handleCancelRequest = async () => {
    setIsCancelLoading(true);
    if (item?.user?._id) {
      const options = {
        id: item?.user?._id,
        data: {},
      };
      const result = await cancelFriendRequest(options);
      if (result?.data?.success) {
        toast.show("Request canceled successfully", { type: "success" });
      } else {
        toast.show("Request canceled unsuccessfully", { type: "danger" });
      }
    }
    setIsCancelLoading(false);
  };

  return (
    <>
      <TouchableRipple
        onPress={() => goto()}
        rippleColor="rgba(255, 255, 255, 0.09)"
        className="h-[72px] w-full border-[1px] border-[#FFFFFF29] rounded-[20px] mt-[16px]"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.04)" }}
      >
        <View className="flex-row items-center gap-x-[8px] relative w-full h-full px-[12px]">
          <ProfileImage
            url={item?.user?.image}
            className="w-[48px] h-[48px] rounded-full"
          />
          <View className="w-full max-w-[285px]">
            <View className="flex-row w-full justify-between items-center">
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                className="font-poppins text-[14px] font-medium leading-[20px] text-white max-w-[220px]"
                style={{ fontFamily: "Poppins-Regular" }}
              >
                {item?.user?.name}
              </Text>
              <Text
                className="font-poppins text-[10px] font-normal leading-[24px] text-[#FFFFFF99] text-right "
                style={{ fontFamily: "Poppins-Regular" }}
              >
                {moment(item?.createdAt).fromNow()}
              </Text>
            </View>
            <View className="flex-row w-full justify-between items-center mt-[5px]">
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                className="font-poppins text-[12px] font-normal leading-[16px] text-[#FFFFFF99] max-w-[220px]"
                style={{ fontFamily: "Poppins-Regular" }}
              >
                {item?.user?.location?.country}
              </Text>

              <View className="flex-row items-center gap-x-[8px]">
                {item?.requester === user?._id && (
                  <TouchableRipple
                    disabled={isCancelLoading}
                    onPress={() => handleCancelRequest()}
                    className="bg-red-500 w-[70px] h-[22px] rounded-[32px] justify-center items-center"
                  >
                    <Text className="text-white font-Poppins-Regular text-[12px]">
                      Cancel
                    </Text>
                  </TouchableRipple>
                )}

                {item?.requester !== user?._id &&
                  item?.status === FRIEND_STATUS.REQUEST_SENT && (
                    <>
                      <TouchableRipple
                        disabled={isRejectLoading}
                        onPress={() => handleRejectRequest()}
                        className="bg-red-500 w-[70px] h-[22px] rounded-[32px] justify-center items-center"
                      >
                        <Text className="text-white font-Poppins-Regular text-[12px]">
                          Rejected
                        </Text>
                      </TouchableRipple>
                      <TouchableRipple
                        disabled={isAcceptLoading}
                        onPress={() => handleAcceptRequest()}
                        className="bg-primary w-[70px] h-[22px] rounded-[32px] justify-center items-center"
                      >
                        <Text className="text-white font-Poppins-Regular text-[12px]">
                          Accept
                        </Text>
                      </TouchableRipple>
                    </>
                  )}
              </View>
            </View>
          </View>
        </View>
      </TouchableRipple>

      <FriendConnectionPopup
        visible={!!visible}
        setVisible={() => setVisible(null)}
        data={visible?.data}
        friendData={visible?.friendData}
      />
    </>
  );
};

export default FriendListItem;
