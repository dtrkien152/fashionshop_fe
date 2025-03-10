import * as React from 'react';
import { LayoutWrapper } from '~/layouts/DefaultLayout/styles.ts';
import { Footer, Header } from '~/layouts';

interface DefaultLayoutProps {
  children: React.ReactNode
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <LayoutWrapper className={'wrapper'}>
      <Header />
      {children}
      <Footer />
    </LayoutWrapper>
  )
}

export default DefaultLayout;