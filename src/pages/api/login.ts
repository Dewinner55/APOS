import {axiosClassic} from "../../api/interseptor";
import {NextApiRequest, NextApiResponse} from "next/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const {email, password} = req.body;
        const referer = req.headers.referer || 'http://localhost:3009/defaultReferer';

        try {
            const axiosConfig = {
                headers: {
                    'Referer': referer
                },
                withCredentials: true
            };
            const response = await axiosClassic.post('/auth/login-user', {
                email,
                password
            }, axiosConfig);

            if (response.status === 200) {
                const cookies: string[] | undefined = response.headers['set-cookie'];
                const accessTokenCookie: string | undefined = cookies?.find(cookie => cookie.startsWith('access_token'));
                if (accessTokenCookie) {
                    const accessToken = accessTokenCookie.split('=')[1].split(';')[0];
                    const {exp} = JSON.parse(atob(accessToken.split('.')[1]));
                    if (cookies) {
                        res.setHeader('Set-Cookie', cookies);
                    } else {
                        throw new Error('Access token not found in cookies');
                    }
                    res.status(200).json({...response.data, exp});
                } else {
                    throw new Error('Access token not found in cookies');
                }
            } else {
                throw new Error(response.data.message || 'Произошла ошибка при попытке входа');
            }
        } catch (error: any) {
            res.status(error.response?.status || 500).json({message: 'Authentication failed', details: error.message});
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
