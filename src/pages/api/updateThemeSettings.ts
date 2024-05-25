import { NextApiRequest, NextApiResponse } from 'next/types';
import {updateUserTheme} from "../../@core/SSR/updateUserProfile";

export default async function handleUpdateThemeSettings(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    const { theme } = req.body;
    const cookies = req.headers.cookie || '';
    const referer = req.headers.referer || 'http://localhost:3009/defaultReferer';

    try {
      const updateParams = { cookies, referer, newTheme: theme };
      const { userProfile, userProfileToken, exp } = await updateUserTheme(updateParams);

      const newUserProfileCookie = `user_profile=${userProfileToken}; path=/; Secure; HttpOnly; SameSite=Strict; expires=${new Date(exp * 1000).toUTCString()}`;
      res.setHeader('Set-Cookie', newUserProfileCookie);
      res.status(200).json({ message: "Theme updated successfully", userProfile });
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
