import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { Register } from '@/lib/components';

const existsToken = async () => {
	const token = cookies().get('authenticate');

	if (token) redirect('/');
};

export default async function RegisterPage() {
	await existsToken();

	return <Register />;
}
