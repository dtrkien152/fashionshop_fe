import { DefaultLayout } from '~/layouts';
import {
  CartDetailPage,
  CheckOutPage,
  HomePage,
  LoginPage,
  NotFoundPage,
  RegisterPage,
} from '~/pages';
import ProductDetail from '~/pages/Product/ProductDetail/ProductDetail.tsx';
import { ProductList } from '~/pages/Product/ProductList/ProductList.tsx';
import {GoogleCallback} from "~/pages/AuthPage/SSO/GoogleCallback.tsx";

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
  login: {
    relative: 'login',
    extract: '/login',
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
    ],
  },
];

export const PRIVATE_ROUTERS: RouteItem[] = [];
