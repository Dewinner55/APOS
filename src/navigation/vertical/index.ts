// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import MessageOutline from 'mdi-material-ui/MessageOutline'
import FolderOutline from 'mdi-material-ui/FolderOutline'
import FolderPlusOutline from 'mdi-material-ui/FolderPlusOutline';
import PackageVariant from 'mdi-material-ui/PackageVariant'
import Trademark from 'mdi-material-ui/Trademark'
import Domain from 'mdi-material-ui/Domain'
import TruckDeliveryOutline from 'mdi-material-ui/TruckDeliveryOutline'
import TicketPercentOutline from 'mdi-material-ui/TicketPercentOutline'
import AccountArrowRightOutline from 'mdi-material-ui/AccountArrowRightOutline'
import CartOutline from 'mdi-material-ui/CartOutline'
import Warehouse from 'mdi-material-ui/Warehouse';
import BullhornOutline from 'mdi-material-ui/BullhornOutline';
import ForumOutline from 'mdi-material-ui/ForumOutline';
import TrendingUp from 'mdi-material-ui/TrendingUp';
import ChatProcessingOutline from 'mdi-material-ui/ChatProcessingOutline';
import Pulse from 'mdi-material-ui/Pulse';
import Inbox from 'mdi-material-ui/Inbox';

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import {
  CreditCardOutline,
  CubeOutline,
  FormatLetterCase,
  GoogleCirclesExtended, OrderBoolAscending,
  StoreAlert,
  Table
} from "mdi-material-ui";

const navigation = (): VerticalNavItemsType => {
  return [
    {
      sectionTitle: 'Administration'
    },
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/dashboard'
    },
    {
      title: 'Analytics',
      icon: Pulse ,
      path: '/analytics'
    },
    {
      title: 'Account Settings',
      icon: AccountCogOutline,
      path: '/account-settings'
    },
    {
      title: 'Message',
      icon: MessageOutline,
      path: '/message'
    },
    {
      title: 'Store',
      icon: StoreAlert,
      path: '/store'
    },
    {
      sectionTitle: 'E-Commerce'
    },
    {
      title: 'Category',
      icon: FolderOutline,
      path: '/category/list',
    },
    {
      title: 'Subcategory',
      icon: FolderPlusOutline,
      path: '/subcategory/list',
    },
    {
      title: 'Products',
      icon: PackageVariant,
      path: '/products/list',
    },
    {
      title: 'Brands',
      icon: Trademark,
      path: '/brands/list',
    },
    {
      title: 'Order',
      icon: OrderBoolAscending,
      path: '/order/list',
    },
    {
      title: 'Invoice',
      icon: Inbox,
      path: '/invoice/list',
    },
    {
      sectionTitle: 'Client Manager'
    },
    {
      title: 'Clients',
      icon: Domain,
      path: '/clients',
    },
    {
      title: 'Delivery',
      icon: TruckDeliveryOutline,
      path: '/delivery',
    },
    {
      title: 'Chat',
      icon: ChatProcessingOutline,
      path: '/chat',
    },
    {
      sectionTitle: 'Bonus program'
    },
    {
      title: 'Promocode',
      icon: TicketPercentOutline,
      path: '/promocode/list',
    },
    {
      title: 'Referal',
      icon: AccountArrowRightOutline,
      path: '/referal',
    },
    {
      sectionTitle: 'Suppliers'
    },
    {
      title: 'Buyers',
      icon: CartOutline,
      path: '/buyers',
    },
    {
      title: 'Warehouse',
      icon: Warehouse,
      path: '/buyers',
    },
  ]
}

export default navigation
