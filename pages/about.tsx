import Header from '../lib/components/landing-page/Header';
import Footer from '../lib/components/landing-page/Footer';
import Feather from '../lib/components/landing-page/assets/components/feather';
import Feather2 from '../lib/components/landing-page/assets/components/feather2';
import Footprints from '../lib/components/landing-page/assets/components/footprints';
import Footprints2 from '../lib/components/landing-page/assets/components/footprints2';
import Path4 from '../lib/components/landing-page/assets/svg/Paths4.svg';
import Path5 from '../lib/components/landing-page/assets/svg/Paths5.svg';
import Frontpage from '../lib/components/landing-page/assets/svg/Frontpage.svg';
import Roadmap from '../lib/components/landing-page/assets/svg/Roadmap.svg';
import React, { useState, useEffect } from 'react';

const About: React.FC = () => {
  const [pageURL, setPageURL] = useState('');
  const [isMobile, setMobile] = useState(false);
  useEffect(() => {
    setPageURL(window.location.href);
    if (navigator.share) {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        )
      ) {
        setMobile(true);
      }
    }
  }, []);
  /*This solution will check if the app is in mobile every re render.
  This means that it will not work if you simply switch from desktop to mobile in the inspect element,
  you must switch it first and then reload to cause the re-render.
  This won't be an issue for mobile devices, because they will already be on mobile, and
  the initial render will indicate to the state that it's a mobile device.*/

  return (
    <div className="bg-white ">
      <Header />

      <header className="overflow-hidden ">
        <div className="bg-blue-header w-[160%] rounded-b-curvy h-[150px] relative overflow-hidden left-[-30%]">
          <div className="text-center pt-12 text-3xl sm:text-4xl font-bold text-blue-footer ">
            About uCredit
          </div>
        </div>
      </header>

      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 max-w-7xl sm:mx-auto mx-4 py-6 px-4 sm:px-6 lg:px-16 justify-items-end">
        {/*Mobile Row 1, Disappears*/}
        <div className="flex w-full mt-3 overflow-hidden sm:h-0 sm:hidden sm:invisible sm:mt-0 sm:w-0 place-content-center">
          <div className="grow ">
            <svg
              viewBox="0 0 1400 1200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="scale-[100%]"
            >
              {isMobile ? <Frontpage /> : <></>}
            </svg>
          </div>
        </div>
        {/*Col 1, Mobile Row 2*/}
        <div className=" justify-items-end grid sm:grid-rows-2 w-[100%] sm:w-auto mb-20 sm:mb-32 overflow-visible sm:mr-7">
          <div className="absolute sm:relative overflow-visible ">
            <Footprints />
          </div>
          <div className=" overflow-hidden sm:mt-[-120px] sm:mb-0 mb-5">
            <div className="inline-block mt-1">
              <Feather />
            </div>
            <div className="inline-block text-2xl sm:text-3xl ">
              Degree Checking
            </div>
          </div>

          <div className="overflow-hidden w-[100%] sm:mt-[-190px] text-black mb-12">
            <div>
              <div>
                Founded in the winter of 2020 by two Hopkins sophomores, this
                was our first step. We were frustrated by the SIS Degree Audit
                and Advising Spreadsheets and knew we could do better. This grew
                to a core group of 5 students in the summer of 2021.
              </div>
              <div>
                <br></br>We put a heavy emphasis on <b>user research</b>. By the
                end of summer, we made sure our users were able to intuitively{' '}
                <b>create a degree roadmap</b> by searching for courses on SIS,{' '}
                <b>adding, deleting, and moving courses</b> around the plan, and
                being able to{' '}
                <b>check degree progress for their selected degree</b>.
              </div>
            </div>
          </div>
        </div>
        {/*Col 2, Mobile Row 2*/}
        <div className="flex sm:h-full w-full sm:mt-10 overflow-hidden invisible sm:visible h-0 place-content-center sm:place-content-start">
          <div className="grow ml-4 sm:ml-7">
            <svg
              viewBox="0 0 1400 1200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="scale-[100%]"
            >
              <Frontpage />
            </svg>
          </div>
        </div>

        {/*Row 2*/}

        {/*Mobile, Disappears*/}
        <div className="flex w-full mt-3 overflow-hidden sm:h-[0px] sm:hidden sm:invisible place-content-center">
          <div className="grow sm:ml-7 ">
            <div>
              <svg
                viewBox="0 0 1450 1200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="scale-[100%]"
              >
                {isMobile ? <Roadmap /> : <></>}
              </svg>
            </div>
          </div>
        </div>
        {/*Col 1*/}
        <div className=" justify-items-end grid sm:grid-rows-2 sm:mt-20 w-[100%] sm:w-auto mt-28 mb-32 overflow:visible sm:mr-7">
          <div className="absolute sm:relative overflow-visible">
            <Footprints2 />
          </div>
          <div className="sm:mt-28 mt-[-110px] ">
            <div className="relative overflow-hidden sm:mt-[-250px] mb-5 sm:mb-0">
              <div className="inline-block mt-1">
                <Feather2 />
              </div>
              <div className="inline-block text-2xl sm:text-3xl">
                Build and Share Roadmap
              </div>
            </div>
          </div>
          <div className="overflow-hidden w-[100%] mt-[-30px] sm:mt-[-150px]">
            <div>
              <div>
                <b>uCredit is more than degree checking</b>, and we decided that
                we wanted to broaden our scope and make uCredit{' '}
                <b>
                  a tool for a student’s career and harness the power of
                  community to reach this goal.{' '}
                </b>
              </div>
              <div>
                <br></br>Our 2022 spring and summer was focused on laying the
                groundworks and blueprints for this new goal. Here are some
                features we’ve implemented:{' '}
              </div>
              <br></br>
              <li>
                Plan sharing, allowing users to easily share a copy of their
                plan.
              </li>
              <li>
                Plan reviewer system, where you can allow your friends or
                advisors to comment, approve, and review your own plan.
              </li>
              <li>
                Roadmap forum, a feature currently in the works where users will
                be able to share and search for others’ plans as templates based
                on degree, tracks, or career tags.
              </li>
            </div>
          </div>
        </div>
        {/*Col 2*/}
        <div className="flex sm:h-full w-full sm:mt-10 overflow-hidden invisible sm:visible h-0 place-content-center sm:place-content-start">
          <div className="w-[100%] h-auto ml-4 sm:ml-7">
            <svg
              viewBox="0 0 1450 1200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="scale-[100%]"
            >
              <Roadmap />
            </svg>
          </div>
        </div>
      </div>

      {/*Future plan*/}
      <div className="relative flex flex-col items-center ">
        {/*Row 1*/}
        <div className="flex flex-row h-[100px] ml-24">
          <div className="rotate-[-53.52deg] w-[15%] scale-[120%]">
            <Feather />
          </div>
          <div className="text-[22px] w-[60%] sm:text-[44px]">
            Our Future Plan
          </div>
          <div className="scale-[30%] sm:scale-[80%]  w-[30%] mt-[-210px] mr-3 mb-8">
            <Path5 />
          </div>
        </div>
        {/*Row 2*/}
        <div className="w-[70%] text-[12px] sm:text-[24px] mt-[-20px] sm:mt-0">
          We plan on continuing moving towards the mission of making uCredit a
          tool that benefits a student’s career through the power of community.
          <br></br>
          <br></br>To do so, here are some features on our roadmap:<br></br>
          <br></br>
          <li>
            Expanding the Roadmap Forum, making a general forum where students
            can ask each other career-related questions to peers and faculty or
            where they can interact and find opportunities with alumni and
            professionals.
          </li>
          <li>
            Incorporate ways to interact with other apps, such as{' '}
            <a href="https://semester.ly/">Semester.ly</a>.
          </li>
          <li>
            Adapting to{' '}
            <a
              className="underline text-blue-600"
              href="https://hub.jhu.edu/2021/11/18/johns-hopkins-second-diversity-equity-inclusion-roadmap-draft/"
            >
              {' '}
              the university’s move towards By2
            </a>{' '}
            for planning degrees.
          </li>
          <li>
            Continue to refine our user experience for all our stakeholders!
          </li>
        </div>
      </div>
      {/*Row 3*/}
      <div className="scale-[30%] sm:scale-[80%] w-[20%] ml-12 mt-[-50px] sm:mt-0">
        <Path4 />
      </div>

      <Footer />
    </div>
  );
};

export default About;
