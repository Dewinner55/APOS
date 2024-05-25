import { NextApiRequest, NextApiResponse } from 'next/types';
import {updateUserLanguage} from "../../@core/SSR/updateUserProfile";

export default async function handleUpdateSystemLanguage(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    const { system_language } = req.body;
    const cookies = req.headers.cookie || '';
    const referer = req.headers.referer || 'http://localhost:3009/defaultReferer';

    try {
      const updateParams = { cookies, referer, newSystemLanguage: system_language };
      const { userProfile, userProfileToken, exp } = await updateUserLanguage(updateParams);

      const newUserProfileCookie = `user_profile=${userProfileToken}; path=/; Secure; HttpOnly; SameSite=Strict; expires=${new Date(exp * 1000).toUTCString()}`;
      res.setHeader('Set-Cookie', newUserProfileCookie);
      res.status(200).json({ message: "System language updated successfully", userProfile });
    } catch (error: any) {
      console.error(error.stack);
      res.status(500).json({
        message: 'Failed to update user settings',
        details: error.message,
        stack: error.stack
      });
    }
  } else {
    res.setHeader('Allow', ['PATCH']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
