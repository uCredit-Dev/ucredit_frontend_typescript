/**
 * Contains features and values that our app embraces.
 */
import React from 'react';
import data from './assets/data/introduceData';
import Bird from './assets/svg/BlueJayIntro.svg';

const Laptop: React.FC = () => {
  return (
    <div className="relative pt-8 pb-20">
      <div className="scale-[120%] absolute right-[-430px] top-[-55%] z-0">
        <Bird />
      </div>
      <div className=" gap-4 items-stretch xxxl:gap-[200px] flex flex-col w-full">
        <div className="z-10 text-blue-footer text-center text-5xl xxxl:text-[100px] bg-white rounded-xl w-max p-2 mx-auto">
          Introducing uCredit
        </div>
        <div className="bg-white rounded-xl w-[66%] ml-[18%] px-2 lg:px-2 leading-10 row-span-1 col-span-4 text-center z-20 text-2xl xxxl:text-[50px] xxxl:leading-[70px] xxxl:px-[450px]">
          A student-centric application packed with features like prereq checks,
          degree trackers, and a beautiful UI that is easily shareable and
          intuitive.
        </div>
      </div>
    </div>
  );
};

const Mobile: React.FC = () => {
  return (
    <div className="grid grid-cols-1 content-center items-center font-bold text-blue-footer text-left ml-10 py-5">
      <div className="text-2xl ">Our Features</div>
      <img
        className="w-2/3 absolute left-[60vw] top-[65vh]"
        src="/img/logo.png"
        alt="logo"
      />
      <div>
        {data.map((d, i) => {
          return (
            <div key={`mobile-feature-${i}`}>
              <br></br>
              <div
                className="flex items-center flex-column align-middle"
                key={d.title}
              >
                <div className="flex bg-gray-200 rounded-md ">
                  <img className="rounded-md" alt="" src={d.img} />
                </div>
                <div className="flex p-2">
                  <div className="text-l text-blue-footer">{d.title}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Introduce: React.FC = () => {
  return (
    <>
      <div className="hidden sm:block">
        <Laptop />
      </div>
      <div className="block sm:hidden">
        <Mobile />
      </div>
    </>
  );
};

export default Introduce;
