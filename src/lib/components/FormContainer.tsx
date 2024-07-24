'use client';

import type { FormEvent, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaRightFromBracket } from "react-icons/fa6";
import { deleteCookie } from 'cookies-next';
import { socket } from "../socket";
import { useChatStore } from "../store";
import style from '../styles/FormContainer.module.css';

export default function FormContainer() {
	const router = useRouter();
	const resetChats = useChatStore(state => state.resetChats);
	const [message, setMessage] = useState('');

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		socket.emit('addChat', message);
		setMessage('');
	}

	async function handleLogout(e: MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		socket.disconnect();
		deleteCookie('authenticate', { path: '/', maxAge: 0 });
		router.push('/register');
		resetChats();
	}

	return (
		<div className={style.form}>
			<form action="" onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Message"
					value={message}
					onChange={e => setMessage(e.currentTarget.value)}
				/>
			</form>
			<button title="logout" onClick={handleLogout}>
				<FaRightFromBracket width={16} height={16} />
			</button>
		</div>
	);
}
