import { setCookie } from 'cookies-next';

export const loadCookie = async (token: string) => {
  setCookie('authenticate', token, {
    path: '/',
    secure: window.location.protocol.includes('https'),
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 15
  });
};
