import * as React from 'react';
import { Footer, Header } from '~/layouts';
import { Outlet } from 'react-router-dom';
import { Cart } from '~/components';
import { OutletWrapper } from '~/layouts/DefaultLayout/styles.ts';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/store.ts';
import { setCartCode, setOpenCart, setProducts } from '~/redux';
import { useFingerprints } from '~/hooks';
import { useEffect } from 'react';
import { cartService } from '~/services';

interface DefaultLayoutProps {}

const DefaultLayout: React.FC<DefaultLayoutProps> = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const { fingerprint } = useFingerprints();
  const { openCart, cartCode } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    if (!fingerprint) return;
    const getCartRequest = isLoggedIn
      ? cartService.getCart(fingerprint)
      : cartService.getCartForGuest(fingerprint);
    getCartRequest.then(async (res) => {
      dispatch(setCartCode(res.data.code));
    });
  }, [isLoggedIn, fingerprint]);

  useEffect(() => {
    if (!cartCode) return;
    cartService.getCartDetails(cartCode).then((res) => {
      dispatch(setProducts(res.data));
    })
  }, [cartCode]);

  return (
    <>
      {/*<Loader/>*/}
      <Toaster position={'top-right'} />
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
