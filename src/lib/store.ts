import type { ChatStore } from './types/global';
import { create } from 'zustand';

export const useChatStore = create<ChatStore>(set => ({
	chats: [],
	autoscroll: false,
	addChat: (chat, autoscroll) => set(state => {
		if (autoscroll) state.setAutoscroll(true);

		return ({ chats: [chat, ...state.chats] });
	}),
	deleteChat: id => set(state => {
		const chats = state.chats.filter(chat => chat._id !== id);

		return ({ chats });
	}),
	loadChats: chatsLoaded => set(state => {
		const chats = [...state.chats, ...chatsLoaded];

		return ({ chats, chatID: chats.at(-1)?._id });
	}),
	setAutoscroll: autoscroll => set({ autoscroll }),
	resetChats: () => set({ chats: [], chatID: undefined })
}));
