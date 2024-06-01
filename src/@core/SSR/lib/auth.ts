// ** Next Import
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next/types'

// ** JWT Import
import jwt from 'jsonwebtoken'

// SSR Import
import { getUserProfile } from '../getUserProfile'
import { refreshToken } from 'src/@core/SSR/refreshToken'
import { ensureLanguageSegment } from '../checkLanguageRedirect'

// HUY ZNAET
import { ParsedUrlQuery } from 'querystring'

// Interface Imports
import { User } from '../../interface/user/interface'

interface EnhancedGetServerSidePropsContext extends GetServerSidePropsContext<ParsedUrlQuery> {
  userProfile?: User
  cookie: string[]
}

type EnhancedGetServerSideProps = (context: EnhancedGetServerSidePropsContext) => Promise<GetServerSidePropsResult<any>>

export function withAuth(gssp: EnhancedGetServerSideProps): GetServerSideProps {
  return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<any>> => {
    const { req, res, locale, resolvedUrl } = context
    let cookies = req.headers.cookie || ''
    const referer = req.headers.referer || 'http://localhost:3009/defaultReferer'
    let hasAccessToken = cookies.includes('access_token=')
    const hasRefreshToken = cookies.includes('refresh_token=')

    let newCookies: string[] = []

    try {
      if (!hasAccessToken && hasRefreshToken) {
        newCookies = await refreshToken(cookies, referer)
        cookies = newCookies.map((cookie: string) => cookie.split(';')[0]).join('; ')
        hasAccessToken = cookies.includes('access_token=')
      }

      if (!hasRefreshToken || !hasAccessToken) {
        throw new Error('NoValidTokens')
      }

      const { userProfile, userProfileToken, exp } = await getUserProfile(cookies, referer)

      const userProfileCookie = `user_profile=${userProfileToken}; path=/; Secure; HttpOnly; SameSite=Strict; expires=${new Date(
        exp * 1000
      ).toUTCString()}`
      const expCookie = `user_profile_exp=${exp}; path=/; SameSite=Strict; expires=${new Date(
        exp * 1000
      ).toUTCString()}`

      console.log('POSTAVIL NEW COKKIE USER $ EXP')

      res.setHeader('Set-Cookie', [...newCookies, userProfileCookie, expCookie])

      const tokenPart = userProfileToken
      const verifiedUserProfile = jwt.verify(tokenPart, 'your-secret-key') as User
      const userLocale = verifiedUserProfile?.user_settings?.system_language || 'en'

      if (userLocale !== locale) {
        const redirectUrl = ensureLanguageSegment(resolvedUrl, userLocale)

        return {
          redirect: {
            destination: redirectUrl,
            permanent: false
          }
        }
      }

      const enhancedContext: EnhancedGetServerSidePropsContext = {
        ...context,
        userProfile: verifiedUserProfile,
        cookie: newCookies
      }

      return await gssp(enhancedContext)
    } catch (error: any) {
      console.error('Ошибка при обновлении токена или получении профиля пользователя:', error)

      // Удалю все куки, если произошло ручное взаимодействие. Если не удалить  куки  и access вручную поменять его,
      // то меня должно перекинуть на /page/login - там идет проверка на наличие access токена, но факту он то есть,
      // просто испорчен, поэтому после того обратно меня перекинет с login на любую страницу где есть withAuth(), но
      // обратно попаду в catch из за неисправности access и меня обратно перекинет на /pages/login. Что приведет к бесконечному
      // циклу редиректов.

      const expiredCookies = cookies.split(';').map(cookie => {
        const [name] = cookie.split('=')
        return `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
      })

      res.setHeader('Set-Cookie', expiredCookies)

      return {
        redirect: {
          destination: '/pages/login',
          permanent: false
        }
      }
    }
  }
}
