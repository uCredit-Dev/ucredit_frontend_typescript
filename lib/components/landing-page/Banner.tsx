import { useState } from 'react';
import { useRouter } from 'next/router';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import ApplicationFormPopup from '../popups/ApplicationFormPopup';
import Bird from './BlueJay.svg';
import Wave1 from './wave1.svg';

const Laptop: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <div className="grid grid-cols-9 bg-blue-header items-stretch font-landingPage">
        <div className="p-35 col-span-4">
          <div className="grid grid-flow-row rows">
            <div className="p-8 mb-2 font-medium m-5 text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl xxxl:text-[180px] text-right text-name">
              uCredit
            </div>
            <div className="p-3 mb-2 xxxl:text-[50px] xxxl:leading-[70px] font-normal m-2 text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-4xl text-right pr-10 text-slogan text-opacity-70">
              Your Academic Planning, <br></br> Made Simple
            </div>

            <div className="z-10 mr-1 scale-[60%]  lg:scale-75 xl:scale-100 md:top-[22%] ml:top-[25rem] lg:top-[80%] top-[20%]  md:left-[-30%] lg:left-[-10%] xl:left-0 left-[-40%] absolute">
              <Bird />
            </div>
            <div className="relative z-10 p-4 mb-2 text-right border-blue-footer pr-16 pt-5 h-[150px]">
              {/* <img className=" scale-x-[-1] absolute" src="/img/logo.png" alt="logo" /> */}
              <button
                className="xxxl:text-[40px] xxxl:py-[30px] z-40 bg-blue-footer text-white absolute font-normal text-sm py-4 px-10 sm:text-base md:text-lg lg:text-xl xl:text-2xl rounded-full right-8"
                onClick={() => router.push('/login')}
              >
                Start
              </button>
            </div>
          </div>
        </div>
        <div className="p-4 col-span-5 w-[90%] lg:w-[600px] xl:w-[750px] monitor:w-[740px] xxxl:ml-24 xxxl:w-[920px]  xxxl:h-[580px] h-full mt-5">
          {/* coded in schedule */}
          <div className="flex flex-row rounded-t-[30px] bg-[#B1CEFF] w-[94%] h-[13%] gap-4">
            <div className="w-[70%]"></div>
            <div className="rounded-[10px] bg-[#FFFFFF] w-[30px] h-[50%] mt-4"></div>
            <div className="rounded-[10px] bg-[#FFFFFF] w-[30px] h-[50%] mt-4"></div>
            <div className="rounded-[10px] bg-[#FFFFFF] w-[30px] h-[50%] mt-4"></div>
            <div className="w-[5%]"></div>
          </div>

          <div className="flex flex-col rounded-b-[30px] bg-[#FFFFFF] w-[94%] h-[80%] gap-0 pl-[8%] pr-[8%] pb-[3%]">
            <div className="h-[14%]"></div>
            {/* first collapse bar */}
            <div className="h-[60%] flex flex-col gap-2 justify-center ">
              {/* little triangle bar */}
              <div className="h-[10%] flex flex-row gap-4">
                <div
                  className="w-0 h-0 
    border-t-[7px] border-t-transparent
    border-r-[12px] border-r-[#6DACFF]
    border-b-[7px] border-b-transparent
    -rotate-90 mb-2
    "
                ></div>
                <div className="bg-[#D9D9D9] w-[70%] h-[12px] "></div>
                <div className="bg-[#FFE0CB] w-[10px] h-[55%] "></div>
                <div className="bg-[#D1FDCD] w-[10px] h-[55%] "></div>
                <div className="bg-[#83B9FF] w-[10px] h-[55%] "></div>
                <div className="bg-[#FFDBDB] w-[10px] h-[55%] "></div>
                <div className="bg-[#FFF9A3] w-[10px] h-[55%] "></div>
              </div>

              {/* first row of courses */}
              <div className="h-[20%] flex flex-row gap-[3%]">
                <div className="bg-[#E0E7EC] rounded-[5px] w-[22%] h-[30px] flex flex-row pt-[5px] pb-[5px] pl-[4px] ">
                  <div className="w-[6px] bg-[#FFE0CB] rounded-[30px]"></div>
                  <div className="w-[80%] flex flex-col gap-1 ml-1 mt-[2px] pr-2">
                    <div className="h-[6px] w-[110%] bg-[#FFFFFF] rounded-[2px]"></div>
                    <div className="h-[6px] w-[85%] bg-[#FFFFFF] rounded-[2px]"></div>
                  </div>
                </div>
                <div className="bg-[#E0E7EC] rounded-[5px] w-[22%] h-[30px] flex flex-row pt-[5px] pb-[5px] pl-[4px] ">
                  <div className="w-[6px] bg-[#FFF9A3] rounded-[30px]"></div>
                  <div className="w-[80%] flex flex-col gap-1 ml-1 mt-[2px] pr-2">
                    <div className="h-[6px] w-[110%] bg-[#FFFFFF] rounded-[2px]"></div>
                    <div className="h-[6px] w-[85%] bg-[#FFFFFF] rounded-[2px]"></div>
                  </div>
                </div>
                <div className="bg-[#E0E7EC] rounded-[5px] w-[22%] h-[30px] flex flex-row pt-[5px] pb-[5px] pl-[4px] ">
                  <div className="w-[6px] bg-[#D1FDCD] rounded-[30px]"></div>
                  <div className="w-[80%] flex flex-col gap-1 ml-1 mt-[2px] pr-2">
                    <div className="h-[6px] w-[110%] bg-[#FFFFFF] rounded-[2px]"></div>
                    <div className="h-[6px] w-[85%] bg-[#FFFFFF] rounded-[2px]"></div>
                  </div>
                </div>
                <div className="bg-[#E0E7EC] rounded-[5px] w-[22%] h-[30px] flex flex-row pt-[5px] pb-[5px] pl-[4px] ">
                  <div className="w-[6px] bg-[#83B9FF] rounded-[30px]"></div>
                  <div className="w-[80%] flex flex-col gap-1 ml-1 mt-[2px] pr-2">
                    <div className="h-[6px] w-[110%] bg-[#FFFFFF] rounded-[2px]"></div>
                    <div className="h-[6px] w-[85%] bg-[#FFFFFF] rounded-[2px]"></div>
                  </div>
                </div>
              </div>

              {/* second row of courses */}
              <div className="h-[20%] flex flex-row gap-[3%]">
                <div className="bg-[#E0E7EC] rounded-[5px] w-[22%] h-[30px] flex flex-row pt-[5px] pb-[5px] pl-[4px] ">
                  <div className="w-[6px] bg-[#D1FDCD] rounded-[30px]"></div>
                  <div className="w-[80%] flex flex-col gap-1 ml-1 mt-[2px] pr-2">
                    <div className="h-[6px] w-[110%] bg-[#FFFFFF] rounded-[2px]"></div>
                    <div className="h-[6px] w-[85%] bg-[#FFFFFF] rounded-[2px]"></div>
                  </div>
                </div>
                <div className="bg-[#E0E7EC] rounded-[5px] w-[22%] h-[30px] flex flex-row pt-[5px] pb-[5px] pl-[4px] ">
                  <div className="w-[6px] bg-[#FFF9A3] rounded-[30px]"></div>
                  <div className="w-[80%] flex flex-col gap-1 ml-1 mt-[2px] pr-2">
                    <div className="h-[6px] w-[110%] bg-[#FFFFFF] rounded-[2px]"></div>
                    <div className="h-[6px] w-[85%] bg-[#FFFFFF] rounded-[2px]"></div>
                  </div>
                </div>
                <div className="bg-[#E0E7EC] rounded-[5px] w-[22%] h-[30px] flex flex-row pt-[5px] pb-[5px] pl-[4px] ">
                  <div className="w-[6px] bg-[#D1FDCD] rounded-[30px]"></div>
                  <div className="w-[80%] flex flex-col gap-1 ml-1 mt-[2px] pr-2">
                    <div className="h-[6px] w-[110%] bg-[#FFFFFF] rounded-[2px]"></div>
                    <div className="h-[6px] w-[85%] bg-[#FFFFFF] rounded-[2px]"></div>
                  </div>
                </div>
                <div className="bg-[#E0E7EC] rounded-[5px] w-[22%] h-[30px] flex flex-row pt-[5px] pb-[5px] pl-[4px] ">
                  <div className="w-[6px] bg-[#83B9FF] rounded-[30px]"></div>
                  <div className="w-[80%] flex flex-col gap-1 ml-1 mt-[2px] pr-2">
                    <div className="h-[6px] w-[110%] bg-[#FFFFFF] rounded-[2px]"></div>
                    <div className="h-[6px] w-[85%] bg-[#FFFFFF] rounded-[2px]"></div>
                  </div>
                </div>
              </div>

              {/* third row of courses */}
              <div className="h-[20%] flex flex-row gap-[3%]">
                <div className="bg-[#E0E7EC] rounded-[5px] w-[22%] h-[30px] flex flex-row pt-[5px] pb-[5px] pl-[4px] ">
                  <div className="w-[6px] bg-[#FFE0CB] rounded-[30px]"></div>
                  <div className="w-[80%] flex flex-col gap-1 ml-1 mt-[2px] pr-2">
                    <div className="h-[6px] w-[110%] bg-[#FFFFFF] rounded-[2px]"></div>
                    <div className="h-[6px] w-[85%] bg-[#FFFFFF] rounded-[2px]"></div>
                  </div>
                </div>
                <div className="rounded-[5px] w-[22%] h-[30px] flex flex-row pt-[5px] pb-[5px] pl-[4px] "></div>
                <div className="bg-[#E0E7EC] rounded-[5px] w-[22%] h-[30px] flex flex-row pt-[5px] pb-[5px] pl-[4px] ">
                  <div className="w-[6px] bg-[#FFE0CB] rounded-[30px]"></div>
                  <div className="w-[80%] flex flex-col gap-1 ml-1 mt-[2px] pr-2">
                    <div className="h-[6px] w-[110%] bg-[#FFFFFF] rounded-[2px]"></div>
                    <div className="h-[6px] w-[85%] bg-[#FFFFFF] rounded-[2px]"></div>
                  </div>
                </div>
                <div className="bg-[#E0E7EC] rounded-[5px] w-[22%] h-[30px] flex flex-row pt-[5px] pb-[5px] pl-[4px] ">
                  <div className="w-[6px] bg-[#FFE0CB] rounded-[30px]"></div>
                  <div className="w-[80%] flex flex-col gap-1 ml-1 mt-[2px] pr-2">
                    <div className="h-[6px] w-[110%] bg-[#FFFFFF] rounded-[2px]"></div>
                    <div className="h-[6px] w-[85%] bg-[#FFFFFF] rounded-[2px]"></div>
                  </div>
                </div>
              </div>

              {/* fourth row of courses */}
              <div className="h-[20%] flex flex-row gap-[3%]">
                <div className="bg-[#E0E7EC] rounded-[5px] w-[22%] h-[30px] flex flex-row pt-[5px] pb-[5px] pl-[4px] ">
                  <div className="w-[6px] bg-[#83B9FF] rounded-[30px]"></div>
                  <div className="w-[80%] flex flex-col gap-1 ml-1 mt-[2px] pr-2">
                    <div className="h-[6px] w-[110%] bg-[#FFFFFF] rounded-[2px]"></div>
                    <div className="h-[6px] w-[85%] bg-[#FFFFFF] rounded-[2px]"></div>
                  </div>
                </div>
                <div className="rounded-[5px] w-[22%] h-[30px] flex flex-row pt-[5px] pb-[5px] pl-[4px] "></div>
                <div className="bg-[#E0E7EC] rounded-[5px] w-[22%] h-[30px] flex flex-row pt-[5px] pb-[5px] pl-[4px] ">
                  <div className="w-[6px] bg-[#FFF9A3] rounded-[30px]"></div>
                  <div className="w-[80%] flex flex-col gap-1 ml-1 mt-[2px] pr-2">
                    <div className="h-[6px] w-[110%] bg-[#FFFFFF] rounded-[2px]"></div>
                    <div className="h-[6px] w-[85%] bg-[#FFFFFF] rounded-[2px]"></div>
                  </div>
                </div>
              </div>

              {/* fifth row of courses */}
              <div className="h-[20%] flex flex-row gap-[3%]">
                <div className="w-[22%]"></div>
                <div className="w-[22%]"></div>
                <div className="bg-[#E0E7EC] rounded-[5px] w-[22%] h-[30px] flex flex-row pt-[5px] pb-[5px] pl-[4px] ">
                  <div className="w-[6px] bg-[#FFF9A3] rounded-[30px]"></div>
                  <div className="w-[80%] flex flex-col gap-1 ml-1 mt-[2px] pr-2">
                    <div className="h-[6px] w-[110%] bg-[#FFFFFF] rounded-[2px]"></div>
                    <div className="h-[6px] w-[85%] bg-[#FFFFFF] rounded-[2px]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* second collapse bar */}
            <div className="h-[40%]  flex flex-col gap-3 justify-center">
              {/* little triangle bar */}
              <div className="h-[15%] flex flex-row gap-4">
                <div
                  className="w-0 h-0 
    border-t-[7px] border-t-transparent
    border-r-[12px] border-r-[#6DACFF]
    border-b-[7px] border-b-transparent
    -rotate-90 mb-2
    "
                ></div>
                <div className="bg-[#D9D9D9] w-[70%] h-[12px] "></div>
                <div className="bg-[#FFE0CB] w-[10px] h-[70%] "></div>
                <div className="bg-[#D1FDCD] w-[10px] h-[70%] "></div>
                <div className="bg-[#83B9FF] w-[10px] h-[70%] "></div>
                <div className="bg-[#FFDBDB] w-[10px] h-[70%] "></div>
                <div className="bg-[#FFF9A3] w-[10px] h-[70%] "></div>
              </div>

              {/* first row of courses */}
              <div className="h-[20%] flex flex-row">
                <div className="bg-[#E0E7EC] rounded-[5px] w-[22%] h-[30px] flex flex-row pt-[5px] pb-[5px] pl-[4px] ">
                  <div className="w-[6px] bg-[#FFE0CB] rounded-[30px]"></div>
                  <div className="w-[80%] flex flex-col gap-1 ml-1 mt-[2px] pr-2">
                    <div className="h-[6px] w-[110%] bg-[#FFFFFF] rounded-[2px]"></div>
                    <div className="h-[6px] w-[85%] bg-[#FFFFFF] rounded-[2px]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="font-landingPage z-30 flex items-right justify-end text-gray-600 select-none sm:text-base md:text-lg lg:text-xl xl:text-2xl mr-[13%]">
        Partnered with Semesterly
        <img
          src="/img/semlylogo.png"
          alt="semesterly"
          className="w-8 h-8 ml-1"
        />
      </div>
    </div>
  );
};

const Mobile: React.FC = () => {
  const router = useRouter();

  return (
    <div className="bg-blue-header content-center items-center font-landingPage text-center">
      <div className="text-2xl font-bold text-blue-footer">
        Your Academic Planning <br></br> Made Simple
      </div>
      <br></br>
      <div className="pl-2 ml-[10%] mr-[8%] mt-1 flex flex-col">
        {/* coded in schedule */}
        <div class="flex flex-row rounded-t-[20px] bg-[#B1CEFF] w-[94%] h-[30px] gap-4">
          <div className="w-[1%]"></div>
          <div className="rounded-[10px] bg-[#E0E7EC] w-[3%] h-[12px] mt-[9px]"></div>
          <div className="rounded-[10px] bg-[#E0E7EC] w-[3%] h-[12px] mt-[9px]"></div>
          <div className="rounded-[10px] bg-[#E0E7EC] w-[3%] h-[12px] mt-[9px]"></div>
        </div>

        <div className="flex flex-col rounded-b-[20px] bg-[#F3F5F8] w-[94%] h-[240px] gap-0 pl-[4%] pr-[6%] pb-[3%]">
          <div className="flex flex-row gap-5">
            <div className="w-[40%] flex flex-col gap-3 justify-center mt-5">
              {/* first row of courses */}
              <div className="bg-[rgb(255,255,255)] rounded-[5px] h-[40px] flex flex-row pt-[5px] pb-[5px] pl-[4px] ">
                <div className="w-[28px] bg-[#FFCAA4] rounded-[6px] mt-[2px] mb-[3px] ml-[6px] mr-[3px]"></div>
                <div className="w-[70%] flex flex-col gap-[5px] ml-[2px] mr-2 mt-[4px] pr-2">
                  <div className="h-[8px] w-[110%] bg-[#E0E7EC] rounded-[2px]"></div>
                  <div className="h-[8px] w-[85%] bg-[#E0E7EC] rounded-[2px]"></div>
                </div>
              </div>
              <div className="bg-[rgb(255,255,255)] rounded-[5px] h-[40px] flex flex-row pt-[5px] pb-[5px] pl-[4px] ">
                <div className="w-[28px] bg-[#FFCAA4] rounded-[6px] mt-[2px] mb-[3px] ml-[6px] mr-[3px]"></div>
                <div className="w-[70%] flex flex-col gap-[5px] ml-[2px] mr-2 mt-[4px] pr-2">
                  <div className="h-[8px] w-[110%] bg-[#E0E7EC] rounded-[2px]"></div>
                  <div className="h-[8px] w-[85%] bg-[#E0E7EC] rounded-[2px]"></div>
                </div>
              </div>
              <div className="bg-[rgb(255,255,255)] rounded-[5px] h-[40px] flex flex-row pt-[5px] pb-[5px] pl-[4px] ">
                <div className="w-[28px] bg-[#FFCAA4] rounded-[6px] mt-[2px] mb-[3px] ml-[6px] mr-[3px]"></div>
                <div className="w-[70%] flex flex-col gap-[5px] ml-[2px] mr-2 mt-[4px] pr-2">
                  <div className="h-[8px] w-[110%] bg-[#E0E7EC] rounded-[2px]"></div>
                  <div className="h-[8px] w-[85%] bg-[#E0E7EC] rounded-[2px]"></div>
                </div>
              </div>
              <div className="bg-[rgb(255,255,255)] rounded-[5px] h-[40px] flex flex-row pt-[5px] pb-[5px] pl-[4px] ">
                <div className="w-[28px] bg-[#FFCAA4] rounded-[6px] mt-[2px] mb-[3px] ml-[6px] mr-[3px]"></div>
                <div className="w-[70%] flex flex-col gap-[5px] ml-[2px] mr-2 mt-[4px] pr-2">
                  <div className="h-[8px] w-[110%] bg-[#E0E7EC] rounded-[2px]"></div>
                  <div className="h-[8px] w-[85%] bg-[#E0E7EC] rounded-[2px]"></div>
                </div>
              </div>
            </div>
            <div className="w-[60%] flex bg-[#FFFFFF] flex-col gap-3 justify-center mt-5 rounded-[10px] px-4 pb-3 pt-4">
              <div className="h-[45%] flex flex-row gap-4">
                <div className="w-[40%] flex flex-col gap-2">
                  <div className="h-[20%] bg-[#E0E7EC]"></div>
                  <div className="h-[20%] bg-[#E0E7EC]"></div>
                  <div className="h-[20%] bg-[#E0E7EC]"></div>
                </div>
                <div className="w-[60%] bg-[#E0E7EC] rounded-[10px]"></div>
              </div>
              <div className="h-[10px] bg-[#F3F5F8]"></div>
              <div className="h-[40%]">
                <div className="h-[65px] bg-[#F3F5F8] rounded-[10px]"></div>
              </div>
              <div className="h-[20%] flex flex-row">
                <div className=" w-[70%] "></div>
                <div className="h-[20px] w-[30%] bg-[#e4eeff] rounded-[10px] pt-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <div className="text-xs text-blue-footer px-8">
        uCredit is a degree-tracking application packed with unique features,
        where users seamlessly manage their academic plans and developers are
        empowered to build great student-centered tools.
      </div>
      <br></br>
      <br></br>
      <button
        className="bg-blue-footer text-white absolute font-normal text-xl py-4 px-20 rounded-full right-8 left-8 text-center"
        onClick={() => router.push('/login')}
      >
        Start Planning
      </button>
      <br></br>
    </div>
  );
};

const Banner: React.FC = () => {
  const [activateEmailPopup, setActivateEmailPopup] = useState<boolean>(false);

  return (
    <>
      {activateEmailPopup && (
        <ApplicationFormPopup setActivateEmailPopup={setActivateEmailPopup} />
      )}
      <div className=" bg-blue-header">
        <br></br>
        <br></br>

        <div className="hidden sm:block">
          <Laptop />
        </div>
        <div className="block sm:hidden">
          <Mobile />
        </div>
        <br></br>
        <br></br>
      </div>
      <div>
        <Wave1 />
      </div>
      <div
        className="w-full cursor-pointer"
        onClick={() => window.scrollTo(0, 575)}
      ></div>
    </>
  );
};

export default Banner;
