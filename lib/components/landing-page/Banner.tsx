import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { useRouter } from 'next/router';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import ApplicationFormPopup from '../popups/ApplicationFormPopup';

/**
 * Banner carousel that alternates between Getting Started and Recruitment banners.
 */
const Banner: React.FC = () => {
  const [activateEmailPopup, setActivateEmailPopup] = useState<boolean>(false);
  const router = useRouter();

  return (
    <>
      {activateEmailPopup && (
        <ApplicationFormPopup setActivateEmailPopup={setActivateEmailPopup} />
      )}
      <div className="grid grid-cols-9 gap-4 h-30 bg-blue-header items-stretch font-landingPage">
        
        <div className="p-35 col-span-4">
          <div className="grid grid-flow-row auto-rows-auto ">
            <div className="p-8 mb-2 font-medium m-5 text-9xl truncate text-right text-name">uCredit</div>
            <div className="p-3 mb-2 font-normal m-2 text-4xl truncate text-right pr-10 text-slogan text-opacity-70">
            Your Academic Planning,<br></br> Made Simple
            </div>
            <div className="relative p-4 mb-2 text-right pr-10 border-blue-footer pr-20 pt-5">
              <img className="z-10 w-50 h-50 mr-1 scale-x-[-1] absolute left-4 top-8" src="/img/logo.png" alt="logo" />
              <button className="bg-blue-footer text-white font-normal text-2xl py-4 px-10 rounded-full text-right" onClick={() => router.push('/login')}>
                Start
              </button>
            </div> 
          </div> 
        </div>
        <div className="p-4 col-span-5 w-5/6">
          <img src="/img/landing-page/cartoon.png" alt="cartoon schedule" />
          <div className="flex items-right justify-end mt-2 text-gray-600 select-none">
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
          
    
      {/* <div className="flex items-center justify-end mt-2 mr-2 text-gray-600 select-none">
        Partnered with Semesterly
        <img
          src="/img/semlylogo.png"
          alt="semesterly"
          className="w-8 h-8 ml-1"
        />
      </div> */}
      <div
        className="w-full cursor-pointer"
        onClick={() => window.scrollTo(0, 575)}
      >
        <div className="mx-auto mb-6 text-lg font-semibold text-center border-b w-32 border-theme">
          Why uCredit?
        </div>
      </div>
    </>
  );
};

export default Banner;