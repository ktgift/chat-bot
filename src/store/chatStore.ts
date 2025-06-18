import { create } from "zustand";
import type { Message } from "../types";

type ChatState = {
  messageList: Message[]
  setMessageList: (message: Message) => void;
  clearMessageList: () => void;
};

export const useChatStore = create<ChatState>((set) => ({
  messageList: [],
  setMessageList: (message: Message) =>
    set((state) => ({ messageList: [...state.messageList, message] })),
  clearMessageList: () => set({ messageList: [] })
}));