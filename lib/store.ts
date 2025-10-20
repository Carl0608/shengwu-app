"use client"

import { create } from "zustand"
import type { User, Message } from "./types"
import { currentUser, mockMessages } from "./mock-data"

interface AppState {
  user: User | null
  messages: Message[]
  unreadCount: number
  setUser: (user: User | null) => void
  markMessageAsRead: (messageId: string) => void
  addMessage: (message: Message) => void
}

export const useAppStore = create<AppState>((set) => ({
  user: currentUser,
  messages: mockMessages,
  unreadCount: mockMessages.filter((m) => !m.read).length,
  setUser: (user) => set({ user }),
  markMessageAsRead: (messageId) =>
    set((state) => ({
      messages: state.messages.map((m) => (m.id === messageId ? { ...m, read: true } : m)),
      unreadCount: Math.max(0, state.unreadCount - 1),
    })),
  addMessage: (message) =>
    set((state) => ({
      messages: [message, ...state.messages],
      unreadCount: message.read ? state.unreadCount : state.unreadCount + 1,
    })),
}))
