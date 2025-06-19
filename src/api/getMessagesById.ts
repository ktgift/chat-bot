export type GetMessagesByIdResponse = {
  id: string;
  text: string;
  isBot: boolean;
  showActions?: boolean;
  isLiked?: boolean;
  isDisliked?: boolean;
};

export const getMessagesById = async (
  threadId: string
): Promise<GetMessagesByIdResponse[]> => {
  // return mock;
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const url = `${baseUrl}/message/${threadId}`;
  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Failed to get data");
  }
  return await response.json();
};

const mock = [
  {
    id: "1",
    text: "Hello! How can I help you today?",
    isBot: true,
    showActions: true, //เป็น true เมื่อเป็นข้อความของ bot
    // isDisliked: true,
  },
  {
    id: "2",
    text: "Can you summarize the meeting notes?",
    isBot: false,
  },
  {
    id: "3",
    text: "Sure! Here's a brief summary of the meeting...",
    isBot: true,
    showActions: true,
  },
  {
    id: "4",
    text: "Thanks, that's helpful!",
    isBot: false,
    showActions: false,
  },
  {
    id: "5",
    text: "You're welcome! 😊",
    isBot: true,
    showActions: true,
    // isLiked: true,
  },
];
