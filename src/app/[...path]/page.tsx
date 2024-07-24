import { redirect } from "next/navigation";
import { cookies } from 'next/headers';

export default async function handleRedirect() {
	const token = cookies().get('authenticate');

	if (token) return redirect('/');

  return redirect('/register');
}
