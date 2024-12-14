import { View, Text } from "react-native";
import React, { useState } from "react";
import { Button, Dialog, Portal } from "react-native-paper";
import { FRIEND_STATUS } from "../../../constants/data";
import {
  useAcceptFriendRequestMutation,
  useCancelFriendRequestMutation,
  useRejectFriendRequestMutation,
  useSentFriendRequestMutation,
} from "../../../redux/features/friend/friendApi";
import { useToast } from "react-native-toast-notifications";
import { useSelector } from "react-redux";

const FriendConnectionPopup = ({
  visible = false,
  setVisible,
  data = {},
  friendData = {},
}) => {
  const { user } = useSelector((state) => state.user);
  const [sentFriendRequest] = useSentFriendRequestMutation();
  const [cancelFriendRequest] = useCancelFriendRequestMutation();
  const [rejectFriendRequest] = useRejectFriendRequestMutation();
  const [acceptFriendRequest] = useAcceptFriendRequestMutation();

  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isRejectLoading, setIsRejectLoading] = useState(false);
  const [isAcceptLoading, setIsAcceptLoading] = useState(false);

  const handleSendFriend = async () => {
    if (friendData?._id) {
      const options = {
        id: friendData?._id,
        data: {},
      };
      const result = await sentFriendRequest(options);
      console.log(result);
      if (result?.data?.success) {
        toast.show("Request sent successfully", { type: "success" });
      } else {
        toast.show("Request sent unsuccessfully", { type: "danger" });
      }
    }
  };

  const handleCancelRequest = async () => {
    if (friendData?._id) {
      const options = {
        id: friendData?._id,
        data: {},
      };
      const result = await cancelFriendRequest(options);
      console.log(result);
      if (result?.data?.success) {
        toast.show("Request canceled successfully", { type: "success" });
      } else {
        toast.show("Request canceled unsuccessfully", { type: "danger" });
      }
    }
  };

  const handleRejectRequest = async () => {
    setIsRejectLoading(true);
    if (friendData?._id) {
      const options = {
        id: friendData?._id,
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
    if (friendData?._id) {
      const options = {
        id: data?._id,
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

  const handleFinish = async () => {
    setIsLoading(true);
    if (data?.status === FRIEND_STATUS.REJECTED || !data) {
      await handleSendFriend();
    }

    if (
      data?.status === FRIEND_STATUS.REQUEST_SENT &&
      data?.requester?._id === user?._id
    ) {
      await handleCancelRequest();
    }
    if (
      data?.status === FRIEND_STATUS.REQUEST_SENT &&
      data?.accepter?._id === user?._id
    ) {
      await handleRejectRequest();
    }
    setVisible(null);
    setIsLoading(false);
  };
  return (
    <>
      <Portal className="">
        <Dialog
          visible={visible}
          onDismiss={() => setVisible(false)}
          className="bg-[#EFE8F6]"
        >
          <Dialog.Title className="text-black font-Poppins-SemiBold">
            Alert
          </Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium" className="text-[16px]">
              {(data?.status === FRIEND_STATUS.REQUEST_SENT &&
                `You’ve already sent a friend request to ${friendData?.name}. Waiting for them to accept!`) ||
                (data?.status === FRIEND_STATUS.REJECTED &&
                  `You don't have this person as a friend yet. Send a friend request to connect!`) ||
                (!data &&
                  `You don't have this person as a friend yet. Send a friend request to connect!`)}
            </Text>
          </Dialog.Content>

          <Dialog.Actions>
            <Button
              onPress={() => setVisible(false)}
              textColor="red"
              className=""
            >
              Cancel
            </Button>

            {data?.status === FRIEND_STATUS.REQUEST_SENT &&
              data?.requester?._id === user?._id && (
                <Button
                  loading={isLoading}
                  disabled={isLoading}
                  onPress={() => handleFinish()}
                  className="bg-primary w-[120px]"
                  textColor="white"
                >
                  Cancel request
                </Button>
              )}

            {data?.status === FRIEND_STATUS.REQUEST_SENT &&
              data?.accepter?._id === user?._id && (
                <>
                  <Button
                    loading={isRejectLoading}
                    disabled={isRejectLoading}
                    onPress={() => handleFinish()}
                    className="bg-red-500 min-w-[80px] mr-[10px]"
                    textColor="white"
                  >
                    Rejected
                  </Button>
                  <Button
                    loading={isAcceptLoading}
                    disabled={isAcceptLoading}
                    onPress={() => handleAcceptRequest()}
                    className="bg-primary min-w-[80px]"
                    textColor="white"
                  >
                    Accept
                  </Button>
                </>
              )}

            {(data?.status === FRIEND_STATUS.REJECTED || !data) && (
              <Button
                loading={isLoading}
                disabled={isLoading}
                onPress={() => handleFinish()}
                className="bg-primary min-w-[120px]"
                textColor="white"
              >
                Sent Request
              </Button>
            )}
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

export default FriendConnectionPopup;
