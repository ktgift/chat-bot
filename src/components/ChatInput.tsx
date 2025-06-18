import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { Colors } from "../constant";
import { useMutation } from "@tanstack/react-query";
import { postMessage } from "../api";

type Props = {
  disabled?: boolean;
  threadId: string;
  onSendMessage: (message: string) => void;
};

const ChatInput = ({ onSendMessage, disabled = false, threadId }: Props) => {
  const [message, setMessage] = useState("");

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
      chatMutation.mutate({
        threadId: threadId,
        question: message,
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Box
      sx={{
        border: "1px solid #e0e0e0",
        backgroundColor: "white",
        borderRadius: 4,
        p: 2,
        marginBottom: 1,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ position: "relative" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            gap: 2,
          }}
        >
          <Box sx={{ flex: 1, position: "relative" }}>
            <TextField
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter your answer..."
              disabled={disabled}
              multiline
              minRows={1}
              maxRows={4}
              variant="standard"
              InputProps={{
                disableUnderline: true, // สำหรับ variant="standard"
                sx: {
                  pr: 6,
                  py: 1.5,
                  border: "none",
                  "& fieldset": {
                    border: "none", // ซ่อน outlined border ถ้าใช้ variant="outlined"
                  },
                },
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexShrink: 0,
            }}
          >
            {/* <Typography variant="body2" color="text.secondary">
              Chat-bot 4
            </Typography> */}
            <Button
              size="small"
              disabled={disabled || !message.trim()}
              type="submit"
              sx={{
                minWidth: 32,
                height: 32,
                p: 0,
                borderRadius: "50%",
                backgroundColor: Colors.orangeLight,
                "&:hover": {
                  backgroundColor: Colors.orangeDark || Colors.orangeLight,
                  color: "white",
                },
              }}
            >
              <ArrowUpwardIcon fontSize="small" />
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatInput;
