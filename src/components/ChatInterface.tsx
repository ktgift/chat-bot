import { Box, Container, Typography } from "@mui/material";
import { Colors } from "../constant";
import type { Message } from "../types";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { useChatStore } from "../store/chatStore";

export const ChatInterface = () => {
  const { setMessageList, messageList } = useChatStore();

  const handleSendMessage = (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
    };

    setMessageList(userMessage);

    // Simulate bot response
    // ใช้ text ส่งให้ api
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "ขอบคุณสำหรับข้อความของคุณ นี่คือการตอบกลับจำลองจาก Chat-bot",
        isBot: true,
        showActions: true,
      };
      setMessageList(botMessage);
    }, 1000);
  };

  const handleLikeMessage = (id: string) => {
    const message = messageList.find((msg: Message) => msg.id === id);
    const newMessage: Message = {
      id,
      text: message?.text || "",
      isBot: message?.isBot || false,
      showActions: message?.showActions || false,
      isLiked: true,
      isDisliked: false,
    };
    setMessageList(newMessage);
  }

  const handleDisLikeMessage = (id: string) => {
    const message = messageList.find((msg: Message) => msg.id === id);
    const newMessage: Message = {
      id,
      text: message?.text || "",
      isBot: message?.isBot || false,
      showActions: message?.showActions || false,
      isLiked: false,
      isDisliked: true,
    };
    setMessageList(newMessage);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      bgcolor={Colors.bg}
    >
      <Box flex={1} overflow="auto" p={2}>
        <Container maxWidth="lg">
          {messageList.map((message) => (
            <ChatMessage
              key={message.id}
              id={message.id}
              message={message.text}
              isBot={message.isBot}
              showActions={message.showActions}
              isLiked={message.isLiked}
              isDisliked={message.isDisliked}
              onLike={handleLikeMessage}
              onDislike={handleDisLikeMessage}
            />
          ))}
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ width: "100%" }}>
        <ChatInput onSendMessage={handleSendMessage} />
         <Box mb={2} display={"flex"} justifyContent="flex-end">
          <Typography variant="caption" color="text.secondary">
            Chat-Bot can make mistakes. Please double-check responses.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
