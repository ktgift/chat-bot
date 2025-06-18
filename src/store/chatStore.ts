import { create } from "zustand";
import type { Message } from "../types";

type ChatState = {
  messageList: Message[]
  setMessageList: (message: Message) => void;
  clearMessageList: () => void;
  toggleLike: (id: string) => void;
  toggleDislike: (id: string) => void;
};

export const useChatStore = create<ChatState>((set) => ({
  messageList: [],
  setMessageList: (message: Message) =>
    set((state) => ({ messageList: [...state.messageList, message] })),
  clearMessageList: () => set({ messageList: [] }),
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