import { Box, Container, Typography } from "@mui/material";
import { Colors } from "../constant";
import type { Message } from "../types";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { useChatStore } from "../store/chatStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getMessagesById, postMessage } from "../api";
import { v4 as uuidv4 } from "uuid";
import { useCallback, useEffect, useState } from "react";

export const ChatInterface = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { setMessageList, messageList, threadId, restoreMessages } =
    useChatStore();

  const { refetch } = useQuery({
    queryKey: ["messages", threadId],
    queryFn: () => getMessagesById(threadId),
    enabled: !!threadId,
  });

  useEffect(() => {
    refetch().then((data) => {
      restoreMessages(data.data as unknown as Message[]);
    });
  }, [threadId]);

  const chatMutation = useMutation({
    mutationFn: postMessage,
    onSuccess: (data) => {
      // save by threadId
      console.debug("Success:", data);
    },
    onError: (error) => {
      console.debug("Error:", error);
    },
  });

  const handleSendMessage = (text: string) => {
    const userMessage: Message = {
      id: uuidv4(),
      text,
      isBot: false,
    };

    setMessageList(userMessage);

    // Simulate bot response
    // ใช้ text ส่งให้ api
    const res = chatMutation.mutate({
      threadId: threadId,
      question: text,
    });
    console.log("res", res);

    const loading = chatMutation.isPending; //TODO test
    console.log("isLoading:", loading);
    setIsLoading(loading); //TODO use this

    setTimeout(() => {
      const botMessage: Message = {
        id: uuidv4(),
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
  };

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

  const copyClipboard = useCallback(async (value: string) => {
    await navigator.clipboard.writeText(value);
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      bgcolor={Colors.bg}
    >
      <Box flex={1} overflow="auto" p={2}>
        <Container maxWidth="lg">
          {messageList.map((message, index) => {
            const lastMessage = index === messageList.length - 1;
            return (
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
              onCopy={copyClipboard}
              isAnimated={lastMessage && message.isBot && !isLoading}
            />
          )
          })}
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ width: "100%" }}>
        <ChatInput isLoading={isLoading} onSendMessage={handleSendMessage} />
        <Box mb={2} display={"flex"} justifyContent="flex-end">
          <Typography variant="caption" color="text.secondary">
            Lao Noi Di can make mistakes. Please double-check responses.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
