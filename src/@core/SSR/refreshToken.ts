import { axiosClassic } from "src/api/interseptor";

export async function refreshToken(cookies: string, referer: string): Promise<string[]> {
  const axiosConfig = {
    headers: {
      'Referer': referer,
      'Cookie': cookies,
    },
    withCredentials: true,
  };

  try {
    const response = await axiosClassic.post('/auth/refresh-token', {}, axiosConfig);

    if (response.status === 200 && response.headers['set-cookie']) {
      return response.headers['set-cookie'];
    } else {
      throw new Error('Failed to refresh token');
    }
  } catch (error) {
    throw error;
  }
}
