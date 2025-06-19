import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import { Colors } from "../constant";
import { useChatStore } from "../store/chatStore";
import { TypedHtml } from "../util/typing";
import { useRef, useState } from "react";

type Props = {
  id?: string;
  message: string;
  isBot?: boolean;
  showActions?: boolean;
  isLiked?: boolean;
  isDisliked?: boolean;
  isAnimated: boolean;
  onLike: (id: string) => void;
  onDislike: (id: string) => void;
  onCopy: (message: string) => void;
  file?: string;
};

const ChatMessage = ({
  id,
  message,
  isBot = false,
  showActions = false,
  isLiked = false,
  isDisliked = false,
  isAnimated = true,
  onCopy,
  file,
}: Props) => {
  const { toggleLike, toggleDislike } = useChatStore();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentFile, setCurrentFile] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayFile = (fileUrl: string) => {
    if (!fileUrl) return;

    // กรณีไฟล์เดิม และเล่นอยู่ -> กดอีกครั้ง = หยุด
    if (audioRef.current && currentFile === fileUrl && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    // ถ้ามีไฟล์ก่อนหน้า (อาจเป็นไฟล์ใหม่)
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // เล่นไฟล์ใหม่
    const audio = new Audio(fileUrl);
    audio.playbackRate = 1.5 ; // ปรับความเร็วการเล่น
    audioRef.current = audio;
    setCurrentFile(fileUrl);
    audio.play();
    setIsPlaying(true);

    // เมื่อเล่นจบ ให้ reset state
    audio.onended = () => {
      setIsPlaying(false);
    };
  };

  return (
    <Box
      display="flex"
      justifyContent={isBot ? "flex-start" : "flex-end"}
      mb={3}
    >
      <Box sx={{ maxWidth: "74rem", width: isBot ? "100%" : "auto" }}>
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
            }}
          >
            {isAnimated ? (
              <TypedHtml
                html={message}
                speed={30}
                sx={{ color: "black", lineHeight: 1.2 }}
              />
            ) : (
              <Box
                sx={{
                  "& h2": { fontWeight: "bold", fontSize: "1.5rem" },
                  "& ul": { pl: 2 },
                  "& li": { mb: 1 },
                  "& strong": { fontWeight: "bold" },
                }}
                dangerouslySetInnerHTML={{ __html: message }}
              />
            )}
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
              <IconButton
                size="small"
                onClick={() => handlePlayFile(file ?? "")}
              >
                {isPlaying ? (
                  <PauseCircleIcon
                    fontSize="small"
                    sx={{ color: isPlaying ? Colors.orangeDark : undefined }}
                  />
                ) : (
                  <VolumeUpIcon fontSize="small"
                    sx={{ color: isPlaying ? Colors.orangeDark : undefined }}
                  />
                )}
              </IconButton>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ChatMessage;
