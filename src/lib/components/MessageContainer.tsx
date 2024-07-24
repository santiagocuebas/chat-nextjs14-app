'use client';

import type { MessageProps } from "../types/props.js";
import { useEffect, useRef } from 'react';
import { format } from 'timeago.js';
import { useChatStore } from '../store';
import style from '../styles/MessageContainer.module.css';

export default function MessageContainer({ id, setAlert }: MessageProps) {
	const ref = useRef<HTMLDivElement | null>(null);
	const chats = useChatStore(state => state.chats);
	const autoscroll = useChatStore(state => state.autoscroll);
	const setAutoscroll = useChatStore(state => state.setAutoscroll);

	function deleteMessage(sender: string, _id: string) {
		if (sender === id) setAlert(_id);
	}
	
	useEffect(() => {
		if (autoscroll) ref.current?.scrollTo(0, 0);

		setAutoscroll(false);
	}, [autoscroll]);

	return (
		<div className={style.message} ref={ref}>
			{
				chats.map(chat => (
					<div
						key={chat._id}
						id={chat._id}
						className={`${chat.from === id ? style.me : ''}`}
						onDoubleClick={() => deleteMessage(chat.from, chat._id)}
					>
						<h3>
							{chat.username}
						</h3>
						<p>
							{chat.body}
						</p>
						<p>
							{format(chat.createdAt)}
						</p>
					</div>
				))
			}
		</div>
	);
}
