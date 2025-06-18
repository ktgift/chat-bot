import { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { Colors } from "../constant";
import type { Message } from "../types";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { v4 as uuidv4 } from "uuid";
import { useChatStore } from "../store/chatStore";

export const ChatInterface = () => {
  const [threadId, setThreadId] = useState<string>("");

  useEffect(() => {
    if (!threadId) {
      const newThreadId = uuidv4();
      setThreadId(newThreadId);
    }
  }, []);
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
              message={message.text}
              isBot={message.isBot}
              showActions={message.showActions}
            />
          ))}
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ width: "100%" }}>
        <ChatInput threadId={threadId} onSendMessage={handleSendMessage} />
        <Box mb={2} display={"flex"} justifyContent="flex-end">
          <Typography variant="caption" color="text.secondary">
            Chat-Bot can make mistakes. Please double-check responses.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
