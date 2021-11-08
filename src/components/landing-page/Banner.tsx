import { FC, useState } from "react";
import { ReactComponent as SemesterlySvg } from "../../resources/svg/Semesterly.svg";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import HeadlineImg from "../../resources/images/landing-page/headline.png";
import JoinTeamImg from "../../resources/images/landing-page/joinTeam.png";
import { useNavigate } from "react-router";
import ApplicationFormPopup from "../popups/ApplicationFormPopup";

/**
 * Banner carousel that alternates between Getting Started and Recruitment banners.
 */
const Banner: FC = () => {
  const [activateEmailPopup, setActivateEmailPopup] = useState<boolean>(false);
  const navigate = useNavigate();
  return (
    <>
      {activateEmailPopup ? (
        <ApplicationFormPopup setActivateEmailPopup={setActivateEmailPopup} />
      ) : null}
      <div className="w-full h-4/6">
        <Carousel showThumbs={false} autoPlay interval={5000} infiniteLoop>
          <div>
            <div className="mt-5/6 absolute flex w-full" style={{ top: "70%" }}>
              <button
                onClick={() => navigate("/login")}
                className="mx-auto w-72 h-16 text-white text-3xl font-thin bg-primary rounded-full shadow-xl transform hover:scale-105 transition duration-200 ease-in"
              >
                Get Started
              </button>
            </div>
            <img src={HeadlineImg} alt="" />
          </div>
          <div>
            <div className="absolute flex w-full" style={{ top: "70%" }}>
              <button
                onClick={() => setActivateEmailPopup(true)}
                className="mt-4 mx-auto w-72 h-16 text-white text-3xl font-thin bg-secondary rounded-full shadow-xl transform hover:scale-105 transition duration-200 ease-in"
              >
                Contact Us
              </button>
            </div>
            <img src={JoinTeamImg} alt="" />
          </div>
        </Carousel>
      </div>
      <div className="flex items-center justify-end mr-2 mt-2 text-gray-600 select-none">
        Partnered with Semesterly
        <SemesterlySvg className="ml-1 w-8 h-8" />
      </div>
      <div
        className="w-full cursor-pointer"
        onClick={() => window.scrollTo(0, 575)}
      >
        <div className="mb-6 mx-auto w-36 text-center font-serif text-lg font-semibold border-b border-theme">
          Why uCredit?
        </div>
      </div>
    </>
  );
};

export default Banner;
