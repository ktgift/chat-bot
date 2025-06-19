import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { Box, Button, Card, CardContent, IconButton, Typography } from "@mui/material";
import Speech from "react-speech";
import { TypeAnimation } from "react-type-animation";
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
  onCopy: (message: string) => void;
};

const ChatMessage = ({
  id,
  message,
  isBot = false,
  showActions = false,
  isLiked = false,
  isDisliked = false,
  onCopy,
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
              backgroundColor: Colors.yellowGray,
              borderRadius: 3,
            }}
          >
            <CardContent sx={{ p: 2, pb: "16px !important" }}>
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
              <TypeAnimation
                sequence={[message]} // หรือ [message, 1000] เพื่อหน่วงก่อนหยุด
                speed={50} // ความเร็วการพิมพ์
                wrapper="span"
                cursor={false}
              />
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
              <IconButton
                size="small"
                sx={{ minWidth: 32, height: 32, p: 0 }}
                onClick={() => onCopy(message)}
              >
                <ContentCopyIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  minWidth: 32,
                  height: 32,
                  p: 0,
                  color: isLiked ? Colors.orangeDark : "text.secondary",
                }}
                onClick={() => toggleLike(id || "")}
              >
                <SentimentSatisfiedAltIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  minWidth: 32,
                  height: 32,
                  p: 0,
                  color: isDisliked ? Colors.orangeDark : "text.secondary",
                }}
                onClick={() => toggleDislike(id || "")}
              >
                <SentimentVeryDissatisfiedIcon fontSize="small" />
              </IconButton>
              <Button
                size="small"
                sx={{
                  height: 32,
                  px: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                <Speech
                  text={message} // ข้อความที่ต้องการให้พูด
                  lang="EN-US" // ภาษาเสียงที่รองรับ
                  voice="Daniel" // ชื่อเสียงที่รองรับในระบบ
                  pitch="1"
                  rate="1"
                  volume="1"
                  textAsButton={true}
                  displayText="Speak"
                />
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ChatMessage;
