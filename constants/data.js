export const chats = [
  {
    id: 1,
    user: {
      name: "Sahara Ardia Fadia",
      image: require("../assets/images/message/chat/profile1.png"),
    },
    lastMessage: { message: "Okay see you soon", createdAt: "12:32 AM" },
    unseen: 2,
  },
  {
    id: 2,
    user: {
      name: "Sahara Ardia Fadia",
      image: require("../assets/images/message/chat/profile2.png"),
    },
    lastMessage: { message: "Okay see you soon", createdAt: "12:32 AM" },
    unseen: 0,
  },
  {
    id: 3,
    user: {
      name: "Sahara Ardia Fadia",
      image: require("../assets/images/message/chat/profile3.png"),
    },
    lastMessage: { message: "Okay see you soon", createdAt: "12:32 AM" },
    unseen: 0,
  },
  {
    id: 4,
    user: {
      name: "Sahara Ardia Fadia",
      image: require("../assets/images/message/chat/profile4.png"),
    },
    lastMessage: { message: "Okay see you soon", createdAt: "12:32 AM" },
    unseen: 0,
  },
  {
    id: 5,
    user: {
      name: "Sahara Ardia Fadia",
      image: require("../assets/images/message/chat/profile5.png"),
    },
    lastMessage: { message: "Okay see you soon", createdAt: "12:32 AM" },
    unseen: 0,
  },
  {
    id: 6,
    user: {
      name: "Sahara Ardia Fadia",
      image: require("../assets/images/message/chat/profile6.png"),
    },
    lastMessage: { message: "Okay see you soon", createdAt: "12:32 AM" },
    unseen: 0,
  },
  {
    id: 7,
    user: {
      name: "Sahara Ardia Fadia",
      image: require("../assets/images/message/chat/profile7.png"),
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
