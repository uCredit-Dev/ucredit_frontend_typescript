import React, { FC } from "react";
import { ReactComponent as SemesterlySvg } from "../../resources/svg/Semesterly.svg";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import HeadlineImg from '../../resources/images/landing-page/headline.png';
import JoinTeamImg from '../../resources/images/landing-page/joinTeam.png';

const Banner: FC = () => {
  return (
    <>
      <div className='w-full'>
        <Carousel showThumbs={false} autoPlay interval={5000} infiniteLoop>
          <div>
            <img src={HeadlineImg} alt='' />
          </div>
          <div>
            <img src={JoinTeamImg} alt='' />
          </div>
        </Carousel>
      </div>
      <div className='flex items-center justify-end mt-2 mr-2 text-gray-600'>
        Partnered with Semesterly
        <SemesterlySvg className='w-8 h-8 ml-1' />
      </div>
    </>
  );
};

export default Banner;
