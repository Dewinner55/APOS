import { NextApiRequest, NextApiResponse } from 'next/types';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Перенаправляем пользователя на дашборд
    res.writeHead(302, { Location: '/dashboard' });
    res.end();
  } else {
    // Возвращаем ошибку, если используется неподдерживаемый метод
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
