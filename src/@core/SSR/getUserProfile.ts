// ** Axios Import
import { axiosClassic } from 'src/api/interseptor'

// ** JWT Token
import jwt from 'jsonwebtoken'

// interface Import
import { User } from 'src/@core/interface/user/interface'

// interface
interface UserProfileResponse {
  userProfile: User
  userProfileToken: string
  exp: number
}

export async function getUserProfile(cookies: string, referer: string): Promise<UserProfileResponse> {
  const axiosConfig = {
    headers: {
      Referer: referer,
      Cookie: cookies
    },
    withCredentials: true
  }

  const userProfileResponse = await axiosClassic.get('/auth/get-user-profile', axiosConfig)

  if (userProfileResponse.status === 200) {
    const accessTokenCookie = cookies?.split('; ').find(cookie => cookie.startsWith('access_token'))

    if (!accessTokenCookie) {
      throw new Error('Access token not found in cookies')
    }

    const accessToken = accessTokenCookie.split('=')[1]
    const { exp } = JSON.parse(atob(accessToken.split('.')[1]))
    const userProfileToken = jwt.sign(userProfileResponse.data, 'your-secret-key')

    return {
      userProfile: userProfileResponse.data,
      userProfileToken,
      exp
    }
  } else {
    throw new Error(userProfileResponse.data.message || 'Произошла ошибка при попытке получить профиль пользователя')
  }
}
