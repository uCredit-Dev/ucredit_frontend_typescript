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
    <div className="flex flex-col w-full h-full bg-white">
      <Header />
      <Banner />
      <Introduce />
      <Promo />
      <Links />
      <Footer />
    </div>
  );
};

export default LandingPage;
