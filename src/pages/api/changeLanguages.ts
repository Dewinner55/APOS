import { NextApiRequest, NextApiResponse } from 'next/types';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Получаем текущий URL из параметров запроса
    const { currentUrl } = req.query;

    // Перенаправляем пользователя на текущий URL
    res.writeHead(302, { Location: currentUrl });
    res.end();
  } else {
    // Возвращаем ошибку, если используется неподдерживаемый метод
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
