// ** Next Import
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next/types';
import {refreshToken} from "../refreshToken";

export function withAuthForLogin(gssp: GetServerSideProps): GetServerSideProps {
    return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<any>> => {
        const { req, res } = context;
        const cookies = req.headers.cookie || '';
        const referer = req.headers.referer || 'http://localhost:3009/defaultReferer';
        const currentPath = context.resolvedUrl; // получаем текущий путь

        try {
            const hasAccessToken = cookies.includes('access_token=');
            const hasRefreshToken = cookies.includes('refresh_token=');

            if (!hasAccessToken || !hasRefreshToken) {
                if (!hasRefreshToken && hasAccessToken) {
                    // Удаляем куки access_token и user_profile
                    res.setHeader('Set-Cookie', [
                        'access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
                        'user_profile=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
                    ]);
                }

                const newCookies = await refreshToken(cookies, referer);
                if (newCookies) {
                    res.setHeader('Set-Cookie', newCookies);
                    if (currentPath !== '/dashboard') { // проверяем, не находимся ли мы уже на странице dashboard
                        return {
                            redirect: {
                                destination: '/dashboard',
                                permanent: false,
                            },
                        };
                    }
                } else if (currentPath !== '/auth/login') { // проверяем, не находимся ли мы уже на странице auth/login
                    return {
                        redirect: {
                            destination: '/auth/login',
                            permanent: false,
                        },
                    };
                }
            } else if (currentPath !== '/dashboard') { // Если оба токена присутствуют, и мы не на dashboard
                return {
                    redirect: {
                        destination: '/dashboard',
                        permanent: false,
                    },
                };
            }

            // Если условия перенаправления не выполняются, вызываем gssp
            return await gssp(context);
        } catch (error: any) {
            // Обработка ошибок, например, ошибка при обновлении токена
            if (currentPath !== '/pages/login') {
                return {
                    redirect: {
                        destination: '/pages/login',
                        permanent: false,
                    },
                };
            } else {
                return {
                    props: {
                        error: error.message,
                        initialIsLoading: true,
                    },
                };
            }
        }
    };
}
