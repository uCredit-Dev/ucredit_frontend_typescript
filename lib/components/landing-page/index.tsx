import Banner from './Banner';
import Footer from './Footer';
import Header from './Header';
import Promo from './Promo';

/**
 * This is our future landing page!
 */
const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col w-full h-full bg-white">
      <Header />
      <Banner />
      <Promo />
      <Footer />
    </div>
  );
};

export default LandingPage;
