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
      <div className="w-full h-4/6">
        <Carousel showThumbs={false} autoPlay interval={5000} infiniteLoop>
          <div>
            <div className="mt-5/6 absolute flex w-full top-[70%] h-full">
              <button
                onClick={() => router.push('/login')}
                className="h-[15%] mx-auto font-thin thin:text-lg text-4xl text-white transition duration-200 ease-in transform rounded-full shadow-xl w-[22.5%] bg-primary hover:scale-105"
              >
                Get Started
              </button>
            </div>
            <img src="/img/landing-page/headline.png" alt="headline" />
          </div>
          <div>
            <div className="absolute flex w-full top-[70%] h-full">
              <button
                onClick={() => setActivateEmailPopup(true)}
                className="h-[15%] mx-auto font-thin text-4xl thin:text-lg text-white transition duration-200 ease-in transform rounded-full shadow-xl w-[22.5%] bg-primary hover:scale-105"
              >
                Contact Us
              </button>
            </div>
            <img src="/img/landing-page/join-team.png" alt="join team" />
          </div>
        </Carousel>
      </div>
      <div className="flex items-center justify-end mt-2 mr-2 text-gray-600 select-none">
        Partnered with Semesterly
        <img
          src="/img/semlylogo.png"
          alt="semesterly"
          className="w-8 h-8 ml-1"
        />
      </div>
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
