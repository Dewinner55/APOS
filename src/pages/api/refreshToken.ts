import {NextApiRequest, NextApiResponse} from 'next/types';
import {refreshToken} from "src/@core/SSR/refreshToken";
import nookies from 'nookies';

export default async function refresh(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const cookies = req.headers.cookie || '';
      const referer = req.headers.referer || 'http://localhost:3009/defaultReferer';
      const newCookies = await refreshToken(cookies, referer);

      newCookies.forEach(cookie => {
        const [name, value] = cookie.split(';')[0].split('=');
        nookies.set({ res }, name.trim(), value.trim(), {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          path: '/',
        });
      });

      res.status(200).json({ message: 'Токен успешно обновлен' });
    } catch (error: any) {
      if (error.message === 'Failed to refresh token') {
        // Перенаправляем на страницу входа
        res.writeHead(302, { Location: '/pages/login' });
        res.end();
      } else {
        res.status(500).json({ message: 'Не удалось обновить токен', details: error.message });
      }
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Метод ${req.method} не поддерживается`);
  }
}
