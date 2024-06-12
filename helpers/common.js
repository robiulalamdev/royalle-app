import { Dimensions } from "react-native";
import { chats } from "../constants/data";
const { width, height } = Dimensions.get("window");

export const wp = (percentage) => {
  return (percentage * width) / 100;
};

export const hp = (percentage) => {
  return (percentage * height) / 100;
};

export const getMessagesByChatId = async (chatId) => {
  const result = await chats.find((chat) => chat.id === parseInt(chatId));
  return result;
};
