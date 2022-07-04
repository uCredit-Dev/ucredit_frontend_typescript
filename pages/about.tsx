import Header from '../lib/components/landing-page/Header';
import Footer from '../lib/components/landing-page/Footer';
import Feather from '../lib/components/team-page/feather';
import Feather2 from '../lib/components/team-page/feather2';
import Footprints from '../lib/components/team-page/footprints';
import Footprints2 from '../lib/components/team-page/footprints2';
import Path4 from '../lib/components/team-page/Paths4.svg';
import Path5 from '../lib/components/team-page/Paths5.svg';

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

      {/*Future plan*/}
      <div className="relative flex flex-col items-center">
        {/*Row 1*/}
        <div className="flex flex-row h-[100px] ml-24">
          <div className="rotate-[-53.52deg] w-[15%] scale-[120%]"><Feather /></div>
          <div className="text-[22px] w-[60%] md:text-[44px]">our future plan</div>
          <div className="scale-[30%] md:scale-[80%]  w-[30%] mt-[-210px] ml-1 "><Path5 /></div>
        </div>
        {/*Row 2*/}
        <div className="w-[70%] text-[12px] md:text-[24px] mt-[-20px] sm:mt-0">place holder Micro-planning is simple. It takes a larger vision and breaks it down into yearly, quarterly, monthly, weekly, and daily check-in practices to plan and adjust as necessary. We get some of the same stabilizing effects that a five-year plan may have given us but with shorter chunks of planning that make more sense in our current economic and cultural context.</div>
      </div>
      {/*Row 3*/}
      <div className="scale-[30%] md:scale-[80%] w-[20%] ml-12 mt-[-50px] sm:mt-0"><Path4 /></div>
     
      <Footer />
    </div>
  );
};

export default Team;
