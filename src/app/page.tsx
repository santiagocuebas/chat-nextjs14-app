'use client';

import { useEffect, useState } from 'react';
import { getData } from '@/lib/action';
import { loadCookie } from '@/lib/services';
import { socket } from '@/lib/socket';
import { useChatStore } from '@/lib/store';
import { Form, Message, Alert } from '@/lib/components';
import style from '@/lib/styles/Home.module.css';

export default function Home() {
	const [id, setId] = useState('');
	const [alert, setAlert] = useState<string | null>(null);
	const chats = useChatStore(state => state.chats);
	const chatID = useChatStore(state => state.chatID);
	const { addChat, deleteChat, loadChats } = useChatStore(state => state);

	useEffect(() => {
		async function getUserData() {
			const data = await getData();

			if (data) {
				setId(data.id);
				loadCookie(data.token);
				socket.auth = { sessionID: data.id, token: data.token };
				socket.connect();
			}
		}

		getUserData();
	}, []);

	useEffect(() => {
		function loadMoreChats([entry]: IntersectionObserverEntry[]) {
			if (entry?.isIntersecting) {
				observer?.unobserve(entry.target);
				socket.emit('loadChats', chats.length);
			}
		}
	
		const observer = new IntersectionObserver(loadMoreChats);
		const boxChat = document.getElementById(chatID ?? '@');

		if (boxChat) observer.observe(boxChat);
	}, [chatID]);

	useEffect(() => {
		socket.on('loadChats', loadChats);
		socket.on('addChat', addChat);
		socket.on('deleteChat', deleteChat);

		return () => {
			socket.off('loadChats', loadChats);
			socket.off('addChat', addChat);
			socket.off('deleteChat', deleteChat);
		}
	}, []);

	return (
		<>
			<h1 className={style.title}>
				NJChat
			</h1>
			<div className={style.main}>
				{alert ? <Alert alert={alert} setAlert={setAlert} /> : null}
				<Message id={id} setAlert={setAlert} />
				<Form />
			</div>
		</>
	);
}
