import React from 'react';
import Star from './assets/Star.svg';
import Like from './assets/Like.svg';
import View from './assets/View.svg';

const Laptop: React.FC = () => {
  return (
    <>
      <div className="flex bg-sky-100 items-stretch w-full">
        <div className="mx-24 my-9 text-left">
          <div className="felx flex-row justify-end">
            {/* plan Name */}
            <div className="flex flex-row text-3xl sm: md:text- lg: xl: xxxl: ">
              The Best Plan for CS majors (plan name)
            </div>
            <div className="flex flex-row ml-6">
              {/*Stars*/}
              <button className="flex items-center mx-2 px-3">
                <Star />
              </button>

              {/*Likes*/}
              <button className="flex items-center mx-2 px-3">
                <Like />
                <p>102</p>
              </button>

              {/*Comments*/}
              <div className="flex items-center mx-2 px-3">
                <View />
                <p>324</p>
              </div>
            </div>
          </div>

          <div className="flex flex-row">
            {/* author */}
            <div className="text-sm mt-3 sm: md: lg: xl: ">by uCredit</div>
            {/*tagsList*/}
            <div className="flex flex-row ml-64 mt-2">
              <div>
                <button className="flex-grow-0 mx-2 px-3 pt-0.5 pb-1 rounded-3xl text-blue bg-yellow-tag">
                  English
                </button>
              </div>
              <div>
                <button className="flex-grow-0 mx-2 px-3 pt-0.5 pb-1 rounded-3xl text-blue bg-green-tag">
                  Humanity
                </button>
              </div>

              <div>
                <button className="flex-grow-0 mx-2 px-3 pt-0.5 pb-1 rounded-3xl text-blue bg-red-tag">
                  Pre-law
                </button>
              </div>
            </div>
          </div>

          {/* date */}
          <div className="text-sm mb-4 sm: md: lg: xl: ">
            uploaded on 2022-07-20
          </div>
          <div className="text-sm sm: md: lg: xl: ">
            description of the plan. like pros and cons, explanantion for each
            semester etc... can be a loooong description there’s plenty of space
            here
          </div>
        </div>
      </div>
    </>
  );
};

const Banner: React.FC = () => {
  return (
    <>
      <Laptop />
    </>
  );
};

export default Banner;
