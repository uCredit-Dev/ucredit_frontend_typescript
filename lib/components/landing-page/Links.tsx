import { useState } from 'react';
import { useRouter } from 'next/router';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import ApplicationFormPopup from '../popups/ApplicationFormPopup';

/**
 * Links to Github and Docs
 */
const Links: React.FC = () => {
  const [activateEmailPopup, setActivateEmailPopup] = useState<boolean>(false);
  const router = useRouter();

  return (
    <>
      {activateEmailPopup && (
        <ApplicationFormPopup setActivateEmailPopup={setActivateEmailPopup} />
      )}
    <img src="/img/landing-page/wave.png" alt="cartoon schedule" />
    <div className="font-landingPage grid grid-rows-4 grid-cols-3 grid-flow-col gap-4 items-stretch">
      <div className="row-start-1 row-end-2 col-span-4 text-gray text-center text-3xl md:text-4xl lg:text-5xl">Open Source</div>
      <div className="px-48 row-span-1 col-span-4 text-center text-base md:text-lg lg:text-xl">
        Ucredit is an Open Source community resource dedicated to helping open source projects be as successful as possible. We thrive on community collaboration to help us create a premier resource for open source software development and distribution.
      </div>
      <div className="row-span-2 col-span-1"></div>
      <div className="row-span-2 col-span-1 pl-24 pt-5">
        <button className="px-12 py-5 mr-4 border-4 hover:text-blue-footer hover:bg-blue-header rounded-[50px] font-bold text-base md:text-xl xl:text-2xl">
          Github
        </button>
      </div>
      <div className="row-span-2 col-span-1 pl-28 pt-5">
        <button className="px-12 py-5 mr-4 border-4 hover:text-blue-footer hover:bg-blue-header rounded-[50px] font-bold text-base md:text-xl xl:text-2xl">
          Docs
        </button>
      </div>
      <div className="row-span-2 col-span-1 pl-96 pt-5"></div>
    </div>
    <div
      className="w-full cursor-pointer"
      onClick={() => window.scrollTo(0, 575)}
    >
    </div>
    </>
  );
};

export default Links;