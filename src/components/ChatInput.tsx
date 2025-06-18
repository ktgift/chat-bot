import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Colors } from '../constant';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Box
      // component="div"
      sx={{
        borderTop: '1px solid #e0e0e0',
        backgroundColor: 'white',
        p: 2,
        marginBottom: 4,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ position: 'relative' }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: 2,
          }}
        >
          <Box sx={{ flex: 1, position: 'relative' }}>
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
              InputProps={{
                sx: {
                  pr: 6,
                  py: 1.5,
                },
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
            <Typography variant="body2" color="text.secondary">
              Claude Sonnet 4
            </Typography>
            <Button
              size="small"
              disabled={disabled || !message.trim()}
              type="submit"
              sx={{
                minWidth: 32,
                height: 32,
                p: 0,
                borderRadius: '50%',
                backgroundColor: Colors.orangeLight,
                '&:hover': {
                  backgroundColor: Colors.orangeDark || Colors.orangeLight,
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