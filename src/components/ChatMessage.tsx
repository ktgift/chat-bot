import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ReplayIcon from "@mui/icons-material/Replay";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Typography
} from "@mui/material";
import { Colors } from "../constant";
import { useChatStore } from "../store/chatStore";

type Props = {
  id?: string;
  message: string;
  isBot?: boolean;
  showActions?: boolean;
  isLiked?: boolean;
  isDisliked?: boolean;
  onLike: (id: string) => void;
  onDislike: (id: string) => void;
};

const ChatMessage = ({
  id,
  message,
  isBot = false,
  showActions = false,
  isLiked = false,
  isDisliked = false,
}: Props) => {
  const { toggleLike, toggleDislike } = useChatStore();
  return (
    <Box
      display="flex"
      justifyContent={isBot ? "flex-start" : "flex-end"}
      mb={3}
    >
      <Box sx={{ maxWidth: "74rem", width: isBot ? "100%" : "auto" }}>
        {!isBot && (
          <Box display="flex-end" alignItems="center" mb={1}>
            {/* <Box
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
            </Box> */}
            {/* <Typography variant="body2" color="text.secondary">
              คุยกับอินโฟมากไทย
            </Typography> */}
          </Box>
        )}

        {!isBot && (
          <Card
            elevation={0}
            sx={{
              backgroundColor:  Colors.yellowGray,
              borderRadius: 3
            }}
          >
            <CardContent sx={{ p: 2 }}>
              <Typography
                variant="body2"
                sx={{
                  whiteSpace: "pre-wrap",
                  lineHeight: 1.2,
                  color: "text.primary",
                }}
              >
                {message}
              </Typography>
            </CardContent>
          </Card>
        )}

        {isBot && (
          <Box
            sx={{
              color: "text.primary",
              py: 2,
              // backgroundColor:'red'
            }}
          >
              <Typography
                variant="body2"
                sx={{
                  whiteSpace: "pre-wrap",
                  lineHeight: 1.2,
                }}
              >
                {message}
              </Typography>
          </Box>
        )}

        {showActions && isBot && (
          <Box
            display="flex"
            flexDirection="column"
            // justifyContent="space-between"
            alignItems="flex-start"
            mt={2}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <IconButton size="small" 
                sx={{ minWidth: 32, height: 32, p: 0 }}
              >
                <ContentCopyIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" 
                sx={{ 
                  minWidth: 32, height: 32, p: 0,
                  color: isLiked ? Colors.orangeDark : "text.secondary",
                 }} 
                onClick={() => toggleLike(id || "")}
              >
                <ThumbUpOffAltIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" 
                sx={{ 
                  minWidth: 32, height: 32, p: 0,
                  color: isDisliked ? Colors.orangeDark : "text.secondary",
                }}
                onClick={() => toggleDislike(id || "")}
              >
                <ThumbDownOffAltIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  height: 32,
                  px: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                <ReplayIcon fontSize="small" />
                <Typography variant="caption">Retry</Typography>
              </IconButton>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ChatMessage;
