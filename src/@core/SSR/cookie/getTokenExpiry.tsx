import Cookies from 'js-cookie';

export const checkAndRefreshToken = async (): Promise<boolean> => {
  const userProfileExp = Cookies.get('user_profile_exp');
  console.log('userProfileExp', userProfileExp);

  const refreshAndSetToken = async () => {
    try {
      const response = await fetch('/api/refreshToken', { method: 'POST' });
      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      // После успешного обновления токена выполнить запрос на получение userProfile
      const userProfileResponse = await fetch('/api/getUserProfile', { method: 'GET', credentials: 'include' });
      if (!userProfileResponse.ok) {
        throw new Error('Failed to fetch user profile');
      }

      const data = await userProfileResponse.json();

      // Убедитесь, что полученные куки установлены корректно
      Cookies.set('user_profile_exp', data.exp);

      return true;
    } catch (error) {
      console.error('Failed to refresh token and fetch user profile:', error);

      return false;
    }
  };

  if (!userProfileExp) {
    // Если кука отсутствует, попытайтесь обновить токен
    return await refreshAndSetToken();
  } else {
    const currentTime = Math.floor(Date.now() / 1000); // Текущее время в секундах
    const tokenExpirationTime = parseInt(userProfileExp, 10); // Время истечения токена в секундах

    if ((tokenExpirationTime - currentTime) < 10) {
      // Если до истечения куки осталось менее 10 секунд, попытайтесь обновить токен
      return await refreshAndSetToken();
    }

    return true;
  }
};
