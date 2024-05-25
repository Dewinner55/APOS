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
import UserRight from "views/brands/view/brands-right";
import UserLeftOverview from "views/brands/view/brands-left-overview";

// Interface Imports
import {User} from "src/@core/interface/user/interface";
import {Brands} from "src/@core/interface/brands/interface";
import {Language} from "src/@core/interface/language/interface";

import cookie from 'cookie';
import BrandsLeftOverview from "views/brands/view/brands-left-overview";
import BrandsRight from "views/brands/view/brands-right";
import BrandRight from "views/brands/view/brands-right";

interface DashboardProps {
  userProfile: User;
  brand: Brands;
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
  const brandId = query.id as string;

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
      const responseBrandsId = await axiosClassic.get<Brands>(`/brand-admin?id=${brandId}`, axiosConfig);

      return {languages: responseLang.data, brand: responseBrandsId.data};
    } catch (error) {
      console.error('Error fetching languages or category:', error);

      return {languages: [], brand: {}};
    }
  };

  // Предположим, что сообщения загружаются асинхронно для локализации
  const messages = await import(`../../../messages/${context.locale}.json`);

  const {languages, brand} = await fetchLanguagesAndCategory();

  return {
    props: {
      userProfile,
      brand,
      languages,
      messages: messages.default,
      initialIsLoading: true,
    },
  };
});

const OverViewTab = dynamic(() => import('src/views/brands/view/brands-right/overview'))

// Vars
const tabContentList = (): { [key: string]: ReactElement } => ({
  overview: <OverViewTab/>,
})

const UserViewTab: NextPage<DashboardProps> = ({userProfile, brand, languages}) => {

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={4} md={5}>
        <BrandsLeftOverview
          userProfile={userProfile}
          brand={brand}
          languages={languages}
        />
      </Grid>
      <Grid item xs={12} lg={8} md={7}>
        <BrandRight
          tabContentList={tabContentList()}
        />
      </Grid>
    </Grid>
  )
}

export default UserViewTab
