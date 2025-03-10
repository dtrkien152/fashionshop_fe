import * as React from 'react';
import { Footer, Header } from '~/layouts';
import { Outlet } from 'react-router-dom';
import { Cart } from '~/components';
import { OutletWrapper } from '~/layouts/DefaultLayout/styles.ts';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/store.ts';
import { setOpenCart } from '~/shared/reducers/cartReducer.ts';

interface DefaultLayoutProps {}

const DefaultLayout: React.FC<DefaultLayoutProps> = () => {
  const dispatch = useDispatch();
  const { openCart } = useSelector((state: RootState) => state.cart);

  return (
    <>
      {/*<Loader/>*/}
      <Toaster />
      <Header onOpenCart={() => dispatch(setOpenCart(true))} />
      <OutletWrapper className={'next'}>
        <Outlet />
      </OutletWrapper>
      <Footer />
      <Cart open={openCart} onClose={() => dispatch(setOpenCart(false))} />
    </>
  );
};

export default DefaultLayout;
