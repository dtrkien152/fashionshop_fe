import * as React from 'react';
import { useState } from 'react';
import { Footer, Header } from '~/layouts';
import { Outlet } from 'react-router-dom';
import { Cart } from '~/components';
import { OutletWrapper } from '~/layouts/DefaultLayout/styles.ts';

interface DefaultLayoutProps {}

const DefaultLayout: React.FC<DefaultLayoutProps> = () => {
  const [state, setState] = useState({
    openCart: false,
  });

  return (
    <>
      {/*<Loader/>*/}
      <Header onOpenCart={() => setState({ ...state, openCart: true })} />
      <OutletWrapper className={'next'}>
        <Outlet />
      </OutletWrapper>
      <Footer />
      <Cart open={state.openCart} onClose={() => setState({ ...state, openCart: false })} />
    </>
  );
};

export default DefaultLayout;
