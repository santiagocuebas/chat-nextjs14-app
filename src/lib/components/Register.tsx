'use client';

import type { FormEvent } from 'react';
import type { ResponseData, IKeys } from '../types/global';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ErrorBox } from './index';
import axios from '../axios';
import { loadCookie } from '../services';
import style from '../styles/Register.module.css';

export default function Register() {
	const router = useRouter();
	const [errors, setErrors] = useState<IKeys<string> | null>(null);

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const data: ResponseData | null = await axios({
			method: e.currentTarget.method,
			url: e.currentTarget.action.replace(location.origin, ''),
			data: e.currentTarget
		}).then(res => res.data)
			.catch(() => null);

		if (data?.error) console.log(data.error);
		else if (data?.errors) setErrors(data.errors);
		else if (data?.token) {
			loadCookie(data.token);
			router.push('/');
		}
	};

	return (
		<div className={style.register}>
			<h1>
				Register
			</h1>
			<form action="/register" method="POST" onSubmit={handleSubmit}>
				{errors ? <ErrorBox errors={errors} setErrors={setErrors} /> : null}
				<input type="text" name="email" placeholder="Email" />
				<input type="password" name="password" placeholder="Password" />
				<button className={style.button}>
					Register
				</button>
			</form>
		</div>
	);
}
