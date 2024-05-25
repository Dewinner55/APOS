// Next и React Imports
import {withAuth} from "src/@core/SSR/lib/auth";
import {NextPage} from 'next';

// Axios API
import {axiosClassic} from "src/api/interseptor";

// Component Imports
import SubcategoryList from "src/views/subcategory/list";

// Interface Imports
import {Language} from "src/@core/interface/language/interface";
import {User} from "src/@core/interface/user/interface";

interface DashboardProps {
  userProfile: User;
  languages: Language[];
  hasTranslation: boolean;
  initialIsLoading: boolean;
}

export const getServerSideProps = withAuth(async (context) => {
  const { userProfile } = context;
  const { query, cookie } = context;

  const getCookies = () => {
    return cookie.length === 0 ? context.req.headers.cookie : cookie
  }

  const page = query.page ? Number(query.page) : 1;
  const pageSize = query.page_size ? Number(query.page_size) : 10;

  if (!context.req.headers?.cookie?.includes('page')) {
    context.res.setHeader('Set-Cookie', `page=${page}; path=/`);
  }
  if (!context.req.headers?.cookie?.includes('page_size')) {
    context.res.setHeader('Set-Cookie', `page_size=${pageSize}; path=/`);
  }

  const fetchLanguages = async () => {
    try {
      const axiosConfig = {
        headers: {
          'Cookie': getCookies(),
          'Referer': context.req.headers.referer || 'http://localhost:3003/defaultReferer',
        },
        timeout: 5000
      };
      const response = await axiosClassic.get('/base/language', axiosConfig);

      return response.data;
    } catch (error) {
      return [];
    }
  };

  const messages = await import(`../../../messages/${context.locale}.json`);
  const languages = await fetchLanguages();

  return {
    props: {
      userProfile,
      languages,
      messages: messages.default,
      initialIsLoading: true,
    },
  };
});

const SubcategoryListApp: NextPage<DashboardProps> = ({userProfile, languages}) => {

  return <SubcategoryList
    userProfile={userProfile}
    languages={languages}
  />;
};

export default SubcategoryListApp;
