'use server';

import type { IKeys } from './types/global';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import axios from './axios';

export async function getData() {
	const token = cookies().get('authenticate');

	const data: IKeys<string> | undefined = await axios({
		url: '/main',
		headers: { Authorization: token?.value }
	}).then(res => res.data)
		.catch(() => undefined);

	if (!data) {
		cookies().delete('authenticate');
		redirect('/register');
	}

	return data;
};
