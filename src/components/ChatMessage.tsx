import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ReplayIcon from '@mui/icons-material/Replay';

interface ChatMessageProps {
  message: string;
  isBot?: boolean;
  showActions?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isBot = false, showActions = false }) => {
  return (
    <Box
      display="flex"
      justifyContent={isBot ? 'flex-start' : 'flex-end'}
      mb={2}
    >
      <Box sx={{ maxWidth: '48rem', width: isBot ? '100%' : 'auto' }}>
        {isBot && (
          <Box display="flex" alignItems="center" mb={1}>
            <Box
              sx={{
                width: 24,
                height: 24,
                bgcolor: 'grey.900',
                color: 'white',
                fontSize: 12,
                fontWeight: 600,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 1
              }}
            >
              CY
            </Box>
            <Typography variant="body2" color="text.secondary">
              คุยกับอินโฟมากไทย
            </Typography>
          </Box>
        )}

        <Card
          sx={{
            backgroundColor: isBot ? 'white' : 'primary.main',
            color: isBot ? 'text.primary' : 'white',
            boxShadow: 1
          }}
        >
          <CardContent sx={{ p: 2 }}>
            <Typography
              variant="body2"
              sx={{
                whiteSpace: 'pre-wrap',
                lineHeight: 1.6
              }}
            >
              {message}
            </Typography>
          </CardContent>
        </Card>

        {showActions && isBot && (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={2}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <Button size="small" sx={{ minWidth: 32, height: 32, p: 0 }}>
                <ContentCopyIcon fontSize="small" />
              </Button>
              <Button size="small" sx={{ minWidth: 32, height: 32, p: 0 }}>
                <ThumbUpOffAltIcon fontSize="small" />
              </Button>
              <Button size="small" sx={{ minWidth: 32, height: 32, p: 0 }}>
                <ThumbDownOffAltIcon fontSize="small" />
              </Button>
              <Button
                size="small"
                sx={{ height: 32, px: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}
              >
                <ReplayIcon fontSize="small" />
                <Typography variant="caption">Retry</Typography>
              </Button>
            </Box>
            <Typography variant="caption" color="text.secondary">
              Claude can make mistakes. Please double-check responses.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ChatMessage;