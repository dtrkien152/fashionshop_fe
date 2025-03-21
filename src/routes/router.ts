import { DefaultLayout } from '~/layouts';
import {
  CartDetailPage,
  CheckOutPage, ForgotPasswordPage,
  HomePage,
  LoginPage,
  NotFoundPage, OrderListPage, OrderTrackingPage,
  RegisterPage,
  ForgotPasswordPageChangePassword, VNPayResultsPage,
} from '~/pages';
import ProductDetail from '~/pages/Product/ProductDetail/ProductDetail.tsx';
import { ProductList } from '~/pages/Product/ProductList/ProductList.tsx';
import {GoogleCallback} from "~/pages/AuthPage/SSO/GoogleCallback.tsx";
import { BlogDetail, BlogList } from '~/pages/Blog';

export interface RouteItem {
  path: string;
  component: any;
  roles?: string[];
  children?: RouteItem[];
}

export const ROUTER_PATH = {
  home: {
    relative: '/',
    extract: '/',
  },
  cart: {
    relative: 'cart',
    extract: '/cart',
  },
  checkout: {
    relative: 'checkout',
    extract: '/checkout',
  },
  orderList: {
    relative: 'order',
    extract: '/order',
  },
  orderTracking: {
    relative: 'order/tracking/:code',
    extract: '/order/tracking/:code',
  },
  login: {
    relative: 'login',
    extract: '/login',
  },
  forgotPassword: {
    relative: 'forgot-password',
    extract: '/forgot-password',
  },
  forgotPasswordChangePassword: {
    relative: 'forgot-password/change-password',
    extract: '/forgot-password/change-password',
  },
  register: {
    relative: 'register',
    extract: '/register',
  },
  productList: {
    relative: 'product',
    extract: '/product',
  },
  productDetail: {
    relative: 'product/:id',
    extract: '/product/:id',
  },
  notFound: {
    relative: 'error/not-found',
    extract: '/error/not-found',
  },
  googleCallback: {
    relative: 'callback',
    extract: '/callback',
  },
  blogList: {
    relative: 'blogs',
    extract: '/blogs',
  },
  blogDetail: {
    relative: 'blogs/:code',
    extract: '/blogs/:code',
  },
  vnPayResults: {
    relative: 'vnpay/results',
    extract: '/vnpay/results',
  }
};

export const PUBLIC_ROUTERS: RouteItem[] = [
  {
    path: '',
    component: DefaultLayout,
    children: [
      {
        path: ROUTER_PATH.home.relative,
        component: HomePage,
      },
      {
        path: ROUTER_PATH.cart.relative,
        component: CartDetailPage,
      },
      {
        path: ROUTER_PATH.checkout.relative,
        component: CheckOutPage,
      },
      {
        path: ROUTER_PATH.orderList.relative,
        component: OrderListPage,
      },
      {
        path: ROUTER_PATH.orderTracking.relative,
        component: OrderTrackingPage,
      },
      {
        path: ROUTER_PATH.forgotPassword.relative,
        component: ForgotPasswordPage,
      },
      {
        path: ROUTER_PATH.forgotPasswordChangePassword.relative,
        component: ForgotPasswordPageChangePassword,
      },
      {
        path: ROUTER_PATH.login.relative,
        component: LoginPage,
      },
      {
        path: ROUTER_PATH.register.relative,
        component: RegisterPage,
      },
      {
        path: ROUTER_PATH.notFound.relative,
        component: NotFoundPage,
      },
      {
        path: ROUTER_PATH.productList.relative,
        component: ProductList,
      },
      {
        path: ROUTER_PATH.productDetail.relative,
        component: ProductDetail,
      }, {
        path: ROUTER_PATH.googleCallback.relative,
        component: GoogleCallback,
      },
      {
        path: ROUTER_PATH.blogList.relative,
        component: BlogList,
      },
      {
        path: ROUTER_PATH.blogDetail.relative,
        component: BlogDetail,
      },
      {
        path: ROUTER_PATH.vnPayResults.relative,
        component: VNPayResultsPage,
      },
    ],
  },
];

export const PRIVATE_ROUTERS: RouteItem[] = [];
