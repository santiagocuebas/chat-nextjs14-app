'use client';

import type { AlertProps } from "../types/props";
import { socket } from "../socket";
import { useChatStore } from "../store";
import style from '../styles/AlertBox.module.css';

export default function AlertBox({ alert, setAlert }: AlertProps) {
	const deleteChat = useChatStore(state => state.deleteChat)

  function deleteMessage() {
    socket.emit('deleteChat', alert);
		deleteChat(alert);
		setAlert(null);
  }

	return (
		<div className={style.alert}>
			<div>
				<h3>
					Want delete this message?
				</h3>
				<button onClick={deleteMessage}>
					Accept
				</button>
				<button className={style.error} onClick={() => setAlert(null)}>
					Cancel
				</button>
			</div>
		</div>
	);
}