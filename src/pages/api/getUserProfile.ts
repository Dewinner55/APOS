import { NextApiRequest, NextApiResponse } from 'next/types';
import { getUserProfile } from "src/@core/SSR/getUserProfile";

export default async function handleGetUserProfile(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const referer = req.headers.referer || 'http://localhost:3009/defaultReferer';
    const cookies = req.headers.cookie || '';

    try {
      const { userProfile, userProfileToken, exp } = await getUserProfile(cookies, referer);

      const userProfileCookie = `user_profile=${userProfileToken}; path=/; Secure; HttpOnly; SameSite=Strict; expires=${new Date(exp * 1000).toUTCString()}`;
      const expCookie = `user_profile_exp=${exp}; path=/; SameSite=Strict; expires=${new Date(exp * 1000).toUTCString()}`;

      res.setHeader('Set-Cookie', [userProfileCookie, expCookie]);
      res.status(200).json({ userProfile, userProfileToken, exp });
    } catch (error: any) {
      res.status(500).json({ message: 'Failed to fetch user profile', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
