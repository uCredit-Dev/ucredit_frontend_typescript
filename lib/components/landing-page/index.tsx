import React from 'react';
import Banner from './Banner';
import Footer from './Footer';
import Header from './Header';
import Promo from './Promo';
import Links from './Links';
import Introduce from './Introduce';

/**
 * This is our future landing page!
 */
const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col w-screen h-full bg-white fixed overflow-y-auto overflow-x-hidden">
      <Header />
      <div>
        <Banner />
      </div>
      <div className="z-30">
        <Introduce />
      </div>
      <Promo />
      <Links />
      <Footer />
    </div>
  );
};

export default LandingPage;
