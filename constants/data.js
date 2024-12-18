export const chats = [
  {
    id: 1,
    user: {
      name: "Jennifer Anderson",
      // image: require("../assets/images/message/chat/profile1.png"),
      image: require("../assets/images/home/items/img1.png"),
    },
    lastMessage: { message: "Okay see you soon", createdAt: "12:32 AM" },
    unseen: 2,
  },
  {
    id: 2,
    user: {
      name: "Remy Singh",
      // image: require("../assets/images/message/chat/profile2.png"),
      image: require("../assets/images/home/items/img2.jpg"),
    },
    lastMessage: { message: "Okay see you soon", createdAt: "12:32 AM" },
    unseen: 0,
  },
  {
    id: 3,
    user: {
      name: "John Wilson",
      // image: require("../assets/images/message/chat/profile3.png"),
      image: require("../assets/images/home/items/img3.jpg"),
    },
    lastMessage: { message: "Okay see you soon", createdAt: "12:32 AM" },
    unseen: 0,
  },
  {
    id: 4,
    user: {
      name: "Carly Hargrove",
      // image: require("../assets/images/message/chat/profile4.png"),
      image: require("../assets/images/home/items/img4.jpg"),
    },
    lastMessage: { message: "Okay see you soon", createdAt: "12:32 AM" },
    unseen: 0,
  },
  {
    id: 5,
    user: {
      name: "Kristina Jackson",
      // image: require("../assets/images/message/chat/profile5.png"),
      image: require("../assets/images/home/items/img5.jpg"),
    },
    lastMessage: { message: "Okay see you soon", createdAt: "12:32 AM" },
    unseen: 0,
  },
];

export const inboxMessages = [
  { id: 1, user: { id: 1 }, message: "Hi! How are you?" },
  { id: 2, user: { id: 2 }, message: "Hello! I’m doing well. What about you?" },
  {
    id: 3,
    user: { id: 1 },
    message: "Doing great! Let’s go on a date somewhere!",
  },
  {
    id: 4,
    user: { id: 2 },
    message: "Sounds great! Let me know your availability",
  },
  {
    id: 5,
    user: { id: 1 },
    message: "Available on upcoming days",
  },
  {
    id: 6,
    user: { id: 2 },
    message:
      "oh splendid! let me search the best place and i’ll let you know ASAP",
  },
];

export const botConversations = [
  { id: 1, message: "Hi! How can i help you?", isBot: true },
];

export const botAssistantQuestions = [
  {
    question: "Refine matches",
    response:
      "Sure, let's refine your matches. What criteria would you like to adjust?",
    icon: require("../assets/icons/bot/assistant/icon1.png"),
  },
  {
    question: "Update settings",
    response: "No problem! What settings would you like to update?",
    icon: require("../assets/icons/bot/assistant/icon2.png"),
  },
  {
    question: "Schedule response time",
    response:
      "When would you like to schedule a response time? Please provide the date and time.",
    icon: require("../assets/icons/bot/assistant/icon3.png"),
  },
  {
    question: "Setup reminder",
    response:
      "Got it! What reminder would you like to set up and when should I remind you?",
    icon: require("../assets/icons/bot/assistant/icon4.png"),
  },
];

export const homeItems = [
  {
    id: 1,
    image: require("../assets/images/home/items/img1.png"),
    name: "Jennifer Anderson",
    country: "New York",
    age: 24,
    about:
      "An accomplished technology entrepreneur, innovator, and thought leader",
  },
  {
    id: 2,
    image: require("../assets/images/home/items/img2.jpg"),
    name: "Remy Singh",
    country: "California",
    age: 30,
    about: "A creative graphic designer with a passion for visual storytelling",
  },
  {
    id: 3,
    image: require("../assets/images/home/items/img3.jpg"),
    name: "John Wilson",
    country: "Texas",
    age: 28,
    about:
      "A skilled software developer with a focus on mobile application development",
  },
  {
    id: 4,
    image: require("../assets/images/home/items/img4.jpg"),
    name: "Carly Hargrove",
    country: "Florida",
    age: 35,
    about:
      "An experienced project manager with expertise in agile methodologies",
  },
  {
    id: 5,
    image: require("../assets/images/home/items/img5.jpg"),
    name: "Kristina Jackson",
    country: "Washington",
    age: 27,
    about:
      "A marketing specialist with a knack for creating compelling content",
  },
];

export const initialItems = [
  {
    id: 1,
    logo: require("../assets/images/initial/bumble.png"),
    image: require("../assets/images/home/items/img1.png"),
    name: "Jennifer Anderson",
    country: "New York",
    age: 24,
    about:
      "An accomplished technology entrepreneur, innovator, and thought leader",
  },
  {
    id: 2,
    logo: require("../assets/images/initial/tinder.png"),
    image: require("../assets/images/home/items/img2.jpg"),
    name: "Remy Singh",
    country: "California",
    age: 30,
    about: "A creative graphic designer with a passion for visual storytelling",
  },

  {
    id: 3,
    logo: require("../assets/images/initial/hinge.png"),
    image: require("../assets/images/home/items/img3.jpg"),
    name: "John Wilson",
    country: "Texas",
    age: 28,
    about:
      "A skilled software developer with a focus on mobile application development",
  },
  {
    id: 4,
    logo: require("../assets/images/initial/bodoo.png"),
    image: require("../assets/images/home/items/img5.jpg"),
    name: "Kristina Jackson",
    country: "Florida",
    age: 35,
    about:
      "An experienced project manager with expertise in agile methodologies",
  },
];

export const FRIEND_STATUS = {
  REQUEST_SENT: "Request Sent",
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
};

export const NOTIFICATION_TYPES = {
  FRIEND_REQUEST: "Friend request",
  FRIEND_REQUEST_ACCEPT: "Friend request accept",
  FRIEND_REQUEST_REJECT: "Friend request reject",
  FAVORITE: "Favorite",
  PROFILE_VIEW: "Profile view",
  MATCHES: "Matches",
  MESSAGE: "Message",
};

export const USER_GENDERS = {
  MALE: "Male",
  FEMALE: "Female",
  OTHERS: "Others",
};

export const staticMessages = [
  "Wishing you a beautiful start! 🌸 It’s wonderful to connect with you.",
  "Hello! Congratulations on our match. I look forward to knowing you better.",
];
