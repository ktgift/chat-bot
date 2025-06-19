import { Box, Container, Typography } from "@mui/material";
import { Colors } from "../constant";
import type { Message } from "../types";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { useChatStore } from "../store/chatStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { baseUrl, getMessagesById, postMessage } from "../api";
import { v4 as uuidv4 } from "uuid";
import { useCallback, useEffect, useRef, useState } from "react";

export const ChatInterface = () => {
  const [isLoading, setIsLoading] = useState(false);
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const {
    setMessageList,
    messageList,
    threadId,
    restoreMessages,
    setIsAnimated,
    isAnimated,
  } = useChatStore();

  const { refetch } = useQuery({
    queryKey: ["messages", threadId],
    queryFn: () => getMessagesById(threadId),
    enabled: !!threadId,
  });

  console.log('messageList xxx', messageList)

  useEffect(() => {
    refetch().then((data) => {
      restoreMessages(data.data as unknown as Message[]);
      setIsAnimated(false);
    });
  }, [threadId]);

  const chatMutation = useMutation({
    mutationFn: postMessage,
    onSuccess: (data) => {
      // save by threadId
      setIsLoading(false);
      console.debug("Success:", data);
    },
    onError: (error) => {
      console.debug("Error:", error);
    },
  });

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: uuidv4(),
      text,
      isBot: false,
    };

    setMessageList(userMessage);
    setIsAnimated(true);

    setIsLoading(true)
    const res = await chatMutation.mutateAsync({
      threadId: threadId,
      message: text,
    });
    // console.log("res", res);

    const botMessage: Message = {
      id: uuidv4(),
      text: res.answer || "",
      isBot: true,
      showActions: true,
      audioPath: res.audioPath || "",
    };
    setMessageList(botMessage);
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
            console.log("message", messageList);
            const lastMessage = index === messageList.length - 1;
            return (
              message.text !== "" && (
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
                  file={message.audioPath ? `${baseUrl}${message.audioPath}` : undefined}
                  isAnimated={
                    lastMessage && message.isBot && !isLoading && isAnimated
                  }
                />
              )
            );
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
