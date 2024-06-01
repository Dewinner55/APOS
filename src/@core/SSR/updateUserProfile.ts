import { axiosClassic } from '../../api/interseptor'
import jwt from 'jsonwebtoken'

interface UserProfileUpdateParams {
  cookies: string
  referer: string
  newTheme?: string // Новая тема опциональна
  newSystemLanguage?: string
}

interface UserProfileResponse {
  userProfile: any // Замените `any` на более конкретный тип, если он известен
  userProfileToken: string
  exp: number
}

export async function updateUserTheme({
  cookies,
  referer,
  newTheme
}: UserProfileUpdateParams): Promise<UserProfileResponse> {
  const axiosConfig = {
    headers: {
      Referer: referer,
      Cookie: cookies
    },
    withCredentials: true
  }

  const updatePayload = newTheme ? { theme: newTheme } : {}
  const response = await axiosClassic.patch('/auth/user-settings', updatePayload, axiosConfig)

  if (response.status === 200) {
    const accessTokenCookie = cookies?.split('; ').find(cookie => cookie.startsWith('access_token'))

    if (!accessTokenCookie) {
      throw new Error('Access token not found in cookies')
    }

    const accessToken = accessTokenCookie.split('=')[1]
    const { exp } = JSON.parse(atob(accessToken.split('.')[1]))
    const userProfileToken = jwt.sign(response.data, 'your-secret-key')

    return {
      userProfile: response.data,
      userProfileToken,
      exp
    }
  } else {
    throw new Error(response.data.message || 'Failed to update user profile')
  }
}

export async function updateUserLanguage({
  cookies,
  referer,
  newSystemLanguage
}: UserProfileUpdateParams): Promise<UserProfileResponse> {
  const axiosConfig = {
    headers: {
      Referer: referer,
      Cookie: cookies
    },
    withCredentials: true
  }

  const updatePayload = newSystemLanguage ? { system_language: newSystemLanguage } : {}
  const response = await axiosClassic.patch('/auth/user-settings', updatePayload, axiosConfig)

  if (response.status === 200) {
    const accessTokenCookie = cookies?.split('; ').find(cookie => cookie.startsWith('access_token'))

    if (!accessTokenCookie) {
      throw new Error('Access token not found in cookies')
    }

    const accessToken = accessTokenCookie.split('=')[1]
    const { exp } = JSON.parse(atob(accessToken.split('.')[1]))
    const userProfileToken = jwt.sign(response.data, 'your-secret-key')

    return {
      userProfile: response.data,
      userProfileToken,
      exp
    }
  } else {
    throw new Error(response.data.message || 'Failed to update user profile')
  }
}
