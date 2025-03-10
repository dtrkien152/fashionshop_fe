import { DefaultLayout } from '~/layouts';
import {
  CartDetailPage,
  CheckOutPage,
  HomePage,
  LoginPage,
  NotFoundPage,
  RegisterPage,
} from '~/pages';

export interface RouteItem {
  path: string;
  component: any;
  roles?: string[];
  children?: RouteItem[];
}

export const ROUTER_PATH = {
  home: {
    relative: '',
    extract: '',
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
  notFound: {
    relative: 'error/not-found',
    extract: '/error/not-found',
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
    ],
  },
];

export const PRIVATE_ROUTERS: RouteItem[] = [];
