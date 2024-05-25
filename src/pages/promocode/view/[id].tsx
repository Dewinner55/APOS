// React Imports
import type {ReactElement} from 'react'

// Next Imports
import {withAuth} from "src/@core/SSR/lib/auth";
import {NextPage} from 'next';
import dynamic from 'next/dynamic'

// MUI Imports
import Grid from '@mui/material/Grid'

// Axios API
import {axiosClassic} from "src/api/interseptor";

// Component Imports
import UserRight from "views/category/view/category-right";
import UserLeftOverview from "views/category/view/category-left-overview";

// Interface Imports
import {User} from "src/@core/interface/user/interface";
import {Category} from "src/@core/interface/category/interface";
import {Language} from "src/@core/interface/language/interface";

import cookie from 'cookie';

interface DashboardProps {
  userProfile: User;
  category: Category;
  languages: Language[];
  initialIsLoading: boolean;
}

export const getServerSideProps = withAuth(async (context) => {
  const token = context.req.headers.cookie;
  const referer = context.req.headers.referer || 'http://localhost:3003/defaultReferer';
  const {userProfile} = context;

  const parsedCookies = cookie.parse(token ?? '');
  const { access_token, refresh_token } = parsedCookies;

  const {query} = context;
  const categoryId = query.id as string;

  const fetchLanguagesAndCategory = async () => {
    try {
      const cookieString = `access_token=${access_token}; refresh_token=${refresh_token}`;
      const axiosConfig = {
        headers: {
          'Cookie': cookieString,
          'Referer': referer,
        }
      };

      const responseLang = await axiosClassic.get('/base/language', axiosConfig);
      const responseCategoryId = await axiosClassic.get<Category>(`/category-admin?id=${categoryId}`, axiosConfig);

      return {languages: responseLang.data, category: responseCategoryId.data};
    } catch (error) {
      console.error('Error fetching languages or category:', error);

      return {languages: [], category: {}};
    }
  };

  // Предположим, что сообщения загружаются асинхронно для локализации
  const messages = await import(`../../../messages/${context.locale}.json`);

  const {languages, category} = await fetchLanguagesAndCategory();

  return {
    props: {
      userProfile,
      category,
      languages,
      messages: messages.default,
      initialIsLoading: true,
    },
  };
});

const OverViewTab = dynamic(() => import('src/views/category/view/category-right/overview'))

// Vars
const tabContentList = (): { [key: string]: ReactElement } => ({
  overview: <OverViewTab/>,
})

const UserViewTab: NextPage<DashboardProps> = ({userProfile, category, languages}) => {

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={4} md={5}>
        <UserLeftOverview
          userProfile={userProfile}
          category={category}
          languages={languages}
        />
      </Grid>
      <Grid item xs={12} lg={8} md={7}>
        <UserRight
          tabContentList={tabContentList()}
        />
      </Grid>
    </Grid>
  )
}

export default UserViewTab
