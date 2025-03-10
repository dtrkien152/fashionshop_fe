import * as React from 'react';
import { Footer, Header } from '~/layouts';
import { Outlet } from 'react-router-dom';

interface DefaultLayoutProps {}

const DefaultLayout: React.FC<DefaultLayoutProps> = () => {
  return (
    <>
      {/*<Loader/>*/}
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default DefaultLayout;