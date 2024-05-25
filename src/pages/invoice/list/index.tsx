// Next и React Imports
import {withAuth} from "src/@core/SSR/lib/auth";
import {NextPage} from 'next';

// Component Imports
import EditCard from "src/views/invoice/edit/EditCard";
import EditActions from "src/views/invoice/edit/EditActions";

// Interface Imports
import {Language} from "src/@core/interface/language/interface";
import {User} from "src/@core/interface/user/interface";
import cookie from "cookie";
import {axiosClassic} from "src/api/interseptor";
import {Order} from "src/@core/interface/order/interface";
import {InvoiceType} from "src/@core/types/invoice/invoiceTypes";
import {Grid} from "@mui/material";
import Preview from "src/views/invoice/preview";

interface DashboardProps {
  userProfile: User;
  order: Order;
  languages: Language[];
  initialIsLoading: boolean;
}

export const getServerSideProps = withAuth(async (context) => {
  const token = context.req.headers.cookie;
  const referer = context.req.headers.referer || 'http://localhost:3003/defaultReferer';
  const {userProfile} = context;
  const parsedCookies = cookie.parse(token ?? '');
  const {access_token, refresh_token} = parsedCookies;
  const {query} = context;
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
  const {languages, order} = await fetchOrder();

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

const InvoiceListApp: NextPage<DashboardProps> = ({userProfile, order, languages}) => {

  const data = null;


  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={9}>
        <EditCard userProfile={userProfile} order={order} languages={languages}/>
      </Grid>
      <Grid item xs={12} md={3}>
        <EditActions userProfile={userProfile} order={order} languages={languages}/>
      </Grid>
    </Grid>
  );
};

export default InvoiceListApp;
