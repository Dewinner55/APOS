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
import UserRight from "views/subcategory/view/subcategory-right";
import SubcategoryLeftOverview from "views/subcategory/view/subcategory-left-overview";

// Interface Imports
import {User} from "src/@core/interface/user/interface";
import {Subcategory} from "src/@core/interface/subcategory/interface";
import {Language} from "src/@core/interface/language/interface";

interface DashboardProps {
  userProfile: User;
  subcategory: Subcategory;
  languages: Language[];
  initialIsLoading: boolean;
}

export const getServerSideProps = withAuth(async (context) => {
  const { userProfile } = context;
  const { query, cookie } = context;
  const subcategoryId = query.id as string;

  const getCookies = () => {
    return cookie.length === 0 ? context.req.headers.cookie : cookie
  }

  const fetchLanguagesAndCategory = async () => {
    try {
      const axiosConfig = {
        headers: {
          'Cookie': getCookies(),
          'Referer': context.req.headers.referer || 'http://localhost:3003/defaultReferer',
        },
        timeout: 5000
      };

      const responseLang = await axiosClassic.get('/base/language', axiosConfig);
      const responseSubcategoryId = await axiosClassic.get<Subcategory>(`/subcategory-admin?id=${subcategoryId}`, axiosConfig);

      return {languages: responseLang.data, subcategory: responseSubcategoryId.data};
    } catch (error) {
      console.error('Error fetching languages or category:', error);

      return {languages: [], subcategory: {}};
    }
  };

  // Предположим, что сообщения загружаются асинхронно для локализации
  const messages = await import(`../../../messages/${context.locale}.json`);
  const {languages, subcategory} = await fetchLanguagesAndCategory();

  return {
    props: {
      userProfile,
      subcategory,
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

const UserViewTab: NextPage<DashboardProps> = ({userProfile, subcategory, languages}) => {

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={4} md={5}>
        <SubcategoryLeftOverview
          userProfile={userProfile}
          subcategory={subcategory}
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
