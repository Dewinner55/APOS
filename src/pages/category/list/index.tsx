// Next и React Imports
import {withAuth} from "src/@core/SSR/lib/auth";
import {NextPage} from 'next';

// Axios API
import {axiosClassic} from "src/api/interseptor";

// Component Imports
import CategoryList from "src/views/category/list";

// Interface Imports
import {Language} from "src/@core/interface/language/interface";
import {User} from "src/@core/interface/user/interface";

interface DashboardProps {
  userProfile: User;
  languages: Language[];
  hasTranslation: boolean;
  initialIsLoading: boolean;
}

export const getServerSideProps =  withAuth(async (context) => {
  const { userProfile } = context;
  const { query, cookie } = context;

  const getCookies = () => {
    return cookie.length === 0 ? context.req.headers.cookie : cookie
  }

  const page = query.page ? Number(query.page) : 1;
  const pageSize = query.page_size ? Number(query.page_size) : 10;

  // Создаем куку с параметрами страницы, если они не существуют
  if (context.req.headers.cookie && !context.req.headers.cookie.includes('page')) {
    context.res.setHeader('Set-Cookie', `page=${page}; path=/`);
  }

  if (context.req.headers.cookie && !context.req.headers.cookie.includes('page_size')) {
    context.res.setHeader('Set-Cookie', `page_size=${pageSize}; path=/`);
  }

  const fetchLanguages = async () => {
    try {
      const axiosConfig = {
        headers: {
          'Cookie': getCookies(),
          'Referer': context.req.headers.referer || 'http://localhost:3003/defaultReferer',
        }
      };

      const response = await axiosClassic.get('/base/language', axiosConfig);

      return response.data;
    } catch (error) {
      return [];
    }
  };

  // Предположим, что сообщения загружаются асинхронно для локализации
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

const CategoryListApp: NextPage<DashboardProps> = ({userProfile, languages}) => {

  return <CategoryList
    userProfile={userProfile}
    languages={languages}
  />;
};

export default CategoryListApp;
