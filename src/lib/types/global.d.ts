export type ChatStore = ChatStoreProps & ChatStoreMethods;

export interface IKeys<T> {
	[indes: string]: T;
}

export interface IChat {
	_id: string;
	from: string;
	username: string;
	body: string;
	createdAt: Date;
}

export interface ResponseData {
	token: string;
	error: string;
	errors: IKeys<string>;
}

export interface ChatStoreProps {
	chats: IChat[];
	autoscroll: boolean;
	chatID?: string;
}

export interface ChatStoreMethods {
	addChat: (chat: IChat, value?: boolean) => void;
	deleteChat: (id: string) => void;
	loadChats: (chats: IChat[]) => void;
	setAutoscroll: (value: boolean) => void;
	resetChats: () => void;
}
