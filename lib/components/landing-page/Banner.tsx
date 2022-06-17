import { useState } from 'react';
import { useRouter } from 'next/router';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import ApplicationFormPopup from '../popups/ApplicationFormPopup';
import Bird from './BlueJay.svg';
/**
 * Getting Started banners.
 */
const Banner: React.FC = () => {
  const [activateEmailPopup, setActivateEmailPopup] = useState<boolean>(false);
  const router = useRouter();

  return (
    <>
      {activateEmailPopup && (
        <ApplicationFormPopup setActivateEmailPopup={setActivateEmailPopup} />
      )}
      <div className=" bg-blue-header ">
      <br></br><br></br>
      </div>
      {/* <Bird></Bird> */}
      <div className="grid flex grid-cols-9 h-30 bg-blue-header items-stretch font-landingPage">
        
        <div className="p-35 col-span-4">
          <div className="grid grid-flow-row rows">
            <div className="p-8 mb-2 font-medium m-5 text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-right text-name">uCredit</div>
            <div className="p-3 mb-2 font-normal m-2 text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-4xl text-right pr-10 text-slogan text-opacity-70">
              Your Academic Planning, <br></br> Made Simple
            </div>
            <Bird className="z-10 mr-1 scale-[30%] sm:scale-50 md:scale-50 lg:scale-75 xl:scale-100  md:top-[30%] lg:top-[40%] xl:top-[60%] sm:top-[25%] top-[15%] md:left-[-20%] lg:left-[-10%] xl:left-0 sm:left-[-35%] left-[-50%] absolute" alt="logo" />
            <div className="relative z-10 p-4 mb-2 text-right pr-10 border-blue-footer pr-16 pt-5">
              {/* <img className=" scale-x-[-1] absolute" src="/img/logo.png" alt="logo" /> */}
              <button className="z-40 bg-blue-footer text-white absolute font-normal text-sm py-4 px-10 sm:text-base md:text-lg lg:text-xl xl:text-2xl rounded-full right-8" onClick={() => router.push('/login')}>
                Start
              </button>
            </div> 
          </div> 
        </div>
        <div className="p-4 col-span-5 w-5/6">
          <img src="/img/landing-page/cartoon.png" alt="cartoon schedule" />
          <div className="flex items-right justify-end mt-2 text-gray-600 select-none sm:text-base md:text-lg lg:text-xl xl:text-2xl">
            Partnered with Semesterly
          <img
            src="/img/semlylogo.png"
            alt="semesterly"
            className="w-8 h-8 ml-1"
          />
          </div>
        </div>
        <br></br><br></br>
    </div>
    <img src="/img/landing-page/wave.png" alt="cartoon schedule" />
          
    <div
      className="w-full cursor-pointer"
      onClick={() => window.scrollTo(0, 575)}
    >
    </div>
    </>
  );
};

export default Banner;