import { create } from "zustand";
import type { Message } from "../types";
import { v4 as uuidv4 } from "uuid";

type ChatState = {
  messageList: Message[];
  setMessageList: (message: Message) => void;
  restoreMessages: (history: Message[]) => void;
  clearMessageList: () => void;
  threadId: string;
  setThreadId: (id: string) => void;
  setNewThreadId: () => void;
  toggleLike: (id: string) => void;
  toggleDislike: (id: string) => void;
};

export const useChatStore = create<ChatState>((set) => ({
  messageList: [],
  setMessageList: (message: Message) =>
    set((state) => ({ messageList: [...state.messageList, message] })),
  restoreMessages: (history: Message[]) => set({ messageList: history }),
  clearMessageList: () => set({ messageList: [] }),
  threadId: uuidv4(),
  setNewThreadId: () => set({ threadId: uuidv4() }),
  setThreadId: (id: string) => set({ threadId: id }),
  toggleLike: (id: string) =>
    set((state) => ({
      messageList: state.messageList.map((msg) =>
        msg.id === id
          ? {
              ...msg,
              isLiked: !msg.isLiked,
              isDisliked: msg.isLiked ? msg.isDisliked : false,
            }
          : msg
      ),
    })),
  toggleDislike: (id: string) =>
    set((state) => ({
      messageList: state.messageList.map((msg) =>
        msg.id === id
          ? {
              ...msg,
              isDisliked: !msg.isDisliked,
              isLiked: msg.isDisliked ? msg.isLiked : false,
            }
          : msg
      ),
    })),
}));
