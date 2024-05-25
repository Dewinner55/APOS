// Next Imports
import {withAuth} from "src/@core/SSR/lib/auth";
import {NextPage} from 'next';

// Axios API
import {axiosClassic} from "src/api/interseptor";

// Component Imports
import CheckoutWizard from "src/views/order/views";

// Interface Imports
import {User} from "src/@core/interface/user/interface";
import {Language} from "src/@core/interface/language/interface";
import {Order} from "src/@core/interface/order/interface";

import cookie from 'cookie';


interface DashboardProps {
  userProfile: User;
  order: Order;
  languages: Language[];
  initialIsLoading: boolean;
}

export const getServerSideProps = withAuth(async (context) => {
  const token = context.req.headers.cookie;
  const referer = context.req.headers.referer || 'http://localhost:3003/defaultReferer';
  const { userProfile } = context;
  const parsedCookies = cookie.parse(token ?? '');
  const { access_token, refresh_token } = parsedCookies;
  const { query } = context;
  const orderId = query.id as string;

  const fetchOrder = async () => {
    try {
      const cookieString = `access_token=${access_token}; refresh_token=${refresh_token}`;
      const axiosConfig = {
        headers: {
          'Cookie': cookieString,
          'Referer': referer,
        },
      };
      const responseLang = await axiosClassic.get('/base/language', axiosConfig);
      const responseOrderId = await axiosClassic.get<Order>(`/order-admin?id=${orderId}`, axiosConfig);

      return {
        languages: responseLang.data,
        order: responseOrderId.data as Order,
      };
    } catch (error) {
      console.error('Error fetching languages or category:', error);

      return {
        languages: [],
        order: {} as Order,
      };
    }
  };

  const messages = await import(`../../../messages/${context.locale}.json`);
  const { languages, order } = await fetchOrder();

  console.log('order', JSON.stringify(order, null, 2));

  return {
    props: {
      userProfile,
      order,
      languages,
      messages: messages.default,
      initialIsLoading: true,
    },
  };
});

const UserViewTab: NextPage<DashboardProps> = ({userProfile, order, languages}) => {

  return (
    <CheckoutWizard
      userProfile={userProfile}
      order={order}
      languages={languages}
    />
  )
}

export default UserViewTab
