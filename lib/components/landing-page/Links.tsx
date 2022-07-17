import { useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import ApplicationFormPopup from '../popups/ApplicationFormPopup';
import Wave1 from './wave1.svg';

/**
 * Links to Github and Docs
 */
const Laptop: React.FC = () => {
  return (
    <>
      <div className="font-landingPage grid grid-rows-5 grid-cols-3 grid-flow-col gap-4 items-stretch">
        <div className="row-start-1 row-end-2 col-span-4 text-gray text-center text-3xl md:text-4xl lg:text-5xl xxxl:text-[95px]">
          Open Source
        </div>
        <div className="mt-[-30px] lg:mt-0 px-48 row-span-1 col-span-4 text-center text-base md:text-lg lg:text-xl  xxxl:text-[45px]  xxxl:leading-[65px]">
          uCredit is an Open Source community resource dedicated to helping open
          source projects be as successful as possible. We thrive on community
          collaboration to help us create a premier resource for open source
          software development and distribution.
        </div>
        <div className="row-span-2 col-span-1"></div>
        <div className="row-span-2 col-span-1 pl-14 pt-5">
          <a href="https://github.com/uCredit-Dev">
            <button className=" xxxl:text-[55px] xxxl:px-[70px] xxxl:py-[40px] xxxl:border-[8px] xxxl:mt-[60px] px-12 py-5 mr-4 border-4 hover:text-white hover:bg-blue-footer rounded-[50px] font-bold text-base md:text-xl xl:text-2xl">
              Github
            </button>
          </a>
        </div>
        <div className="row-span-2 col-span-1 pl-36 pt-5">
          <a href="https://ucredit-docs.herokuapp.com/">
            <button className="  xxxl:text-[55px] xxxl:px-[70px] xxxl:py-[40px] xxxl:border-[8px] xxxl:mt-[60px] px-12 py-5 mr-4 border-4 hover:text-white hover:bg-blue-footer rounded-[50px] font-bold text-base md:text-xl xl:text-2xl">
              Docs
            </button>
          </a>
        </div>
        <div className="row-span-2 col-span-1 pl-96 pt-5"></div>
      </div>
    </>
  );
};

const Mobile: React.FC = () => {
  return (
    <>
      <div className="font-landingPage items-stretch  text-center">
        <div className="text-4xl font-normal text-black">Open Source</div>
        <br></br>
        <div className="text-xs text-black px-12">
          uCredit is a degree-tracking application packed with unique features,
          where users seamlessly manage their academic plans and developers are
          empowered to build great student-centered tools.
        </div>
        <br></br>
        <div className="grid grid-rows-2 gap-2">
          <a href="https://github.com/uCredit-Dev">
            <button className=" w-80 px-12 py-3 mr-4 border-2 hover:text-white hover:bg-blue-footer rounded-[50px] font-medium text-xl">
              Github
            </button>
          </a>
          <a href="https://ucredit-docs.herokuapp.com/">
            <button className=" w-80 px-12 py-3 mr-4 border-2 hover:text-white hover:bg-blue-footer rounded-[50px] font-medium text-xl">
              Read Docs
            </button>
          </a>
        </div>
        <br></br>
        <br></br>
      </div>
    </>
  );
};

const Links: React.FC = () => {
  const [activateEmailPopup, setActivateEmailPopup] = useState<boolean>(false);

  return (
    <>
      {activateEmailPopup && (
        <ApplicationFormPopup setActivateEmailPopup={setActivateEmailPopup} />
      )}
      <div>
        <Wave1 />
      </div>
      <div className="hidden sm:block">
        <Laptop />
      </div>
      <div className="block sm:hidden">
        <Mobile />
      </div>
      <div
        className="w-full cursor-pointer"
        onClick={() => window.scrollTo(0, 575)}
      ></div>
    </>
  );
};

export default Links;
