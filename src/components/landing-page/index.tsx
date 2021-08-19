import React from "react";
import Banner from "./Banner";
import Header from "./Header";
import Promo from "./Promo";

/**
 * This is our future landing page!
 */
const LandingPage = () => {
  return (
    <div className='w-screen h-screen bg-white'>
      <Header />
      <Banner />
      <Promo />
    </div>
  );
};

export default LandingPage;
