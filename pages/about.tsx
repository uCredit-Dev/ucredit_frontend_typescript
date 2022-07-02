import Header from '../lib/components/landing-page/Header';
import Footer from '../lib/components/landing-page/Footer';
import Feather from '../lib/components/feather';
import Feather2 from '../lib/components/feather2';
import Footprints from '../lib/components/footprints';
import Footprints2 from '../lib/components/footprints2';

const Team: React.FC = () => {
  return (
    <div className="font-landingPage bg-white ">
      <Header />

      <header className="overflow-hidden ">
        <div className="bg-blue-header w-[160%] rounded-b-curvy h-[150px] relative overflow-hidden left-[-30%]">
          <div className="text-center pt-12 text-3xl md:text-4xl font-bold font-landingPage  text-blue-footer ">
            about uCredit
          </div>
        </div>
      </header>

      <div className="mt-14 grid grid-cols-2 mb-40 max-w-7xl md:mx-auto mx-4 py-6 px-4 sm:px-6 lg:px-16 justify-items-end">
        {/*Col 1*/}
        <div className="flex h-3/4 justify-items-end grid grid-rows-2 mb-32 overflow-visible mr-4 md:mr-7">
          <div className="relative overflow-visible">
            <Footprints />
          </div>
          <div className="relative overflow-hidden mt-[-120px]">
            <div className="inline-block mt-1">
              <Feather />
            </div>
            <div className="inline-block text-2xl md:text-3xl ">
              feature 1
            </div>
          </div>
        
          <div className="overflow-hidden w-[39vw] md:w-[100%] mt-[-130px]">
            <svg
              className=""
              width="436"
              height="115"
              viewBox="0 0 436 115"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="436" height="27" fill="#D9D9D9" />
              <rect y="44" width="436" height="27" fill="#D9D9D9" />
              <rect y="88" width="436" height="27" fill="#D9D9D9" />
            </svg>
          </div>
        </div>
        {/*Col 2*/}
        <div className="flex h-full w-full mt-3 mb-32 overflow-hidden">
          <div className="bg-[#E0E7EC] grow ml-4 md:ml-7 md:mr-14"></div>
        </div>
        {/*Row 2*/}
        {/*Col 1*/}
        <div className="flex h-3/4 justify-items-end grid grid-rows-2 mt-20 mb-32 overflow:visible mr-4 md:mr-7">
          <div className="relative overflow-visible">
            <Footprints2 />
          </div>
          <div className="relative overflow-hidden mt-[-140px]">
            <div className="inline-block mt-1">
              <Feather2 />
            </div>
            <div className="inline-block text-2xl md:text-3xl ">
              feature 2
            </div>
          </div>

          <div className="overflow-hidden  w-[39vw] md:w-[100%] mt-[-190px]">
            <svg
              className="md:w-[100%]   w-auto"
              width="436"
              height="115"
              viewBox="0 0 436 115"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="436" height="27" fill="#D9D9D9" />
              <rect y="44" width="436" height="27" fill="#D9D9D9" />
              <rect y="88" width="436" height="27" fill="#D9D9D9" />
            </svg>
          </div>
        </div>
        {/*Col 2*/}
        <div className="flex w-full mt-28 ">
          <div className="bg-[#E0E7EC] grow ml-4 md:ml-7 md:mr-14"></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Team;
