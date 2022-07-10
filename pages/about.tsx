import Header from '../lib/components/landing-page/Header';
import Footer from '../lib/components/landing-page/Footer';
import Feather from '../lib/components/team-page/feather';
import Feather2 from '../lib/components/team-page/feather2';
import Footprints from '../lib/components/team-page/footprints';
import Footprints2 from '../lib/components/team-page/footprints2';
import Path4 from '../lib/components/team-page/Paths4.svg';
import Path5 from '../lib/components/team-page/Paths5.svg';

const Team: React.FC = () => {
  return (
    <div className="font-landingPage bg-white  overflow-y-auto">
      <Header />

      <header className="overflow-hidden ">
        <div className="bg-blue-header w-[160%] rounded-b-curvy h-[150px] relative overflow-hidden left-[-30%]">
          <div className="text-center pt-12 text-3xl sm:text-4xl font-bold font-landingPage  text-blue-footer ">
            about uCredit
          </div>
        </div>
      </header>

      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 mb-40 max-w-7xl sm:mx-auto mx-4 py-6 px-4 sm:px-6 lg:px-16 justify-items-end">
        {/*Mobile Row 1, Disappears*/}
        <div className="flex w-full mt-3 sm:col-span-2 overflow-hidden sm:invisible sm:h-0 place-content-center">
          <div className=".object-scale-down sm:ml-4 sm:ml-7 sm:mr-14">
            <svg
              width="483"
              height="324"
              viewBox="0 0 483 324"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="483" height="324" fill="#E0E7EC" />
            </svg>
          </div>
        </div>
        {/*Col 1, Mobile Row 2*/}
        <div className="flex justify-items-end grid sm:grid-rows-2 w-[100%] sm:w-auto mb-20 sm:mb-32 overflow-visible sm:mr-4 sm:mr-7">
          <div className="absolute sm:relative overflow-visible ">
            <Footprints />
          </div>
          <div className=" overflow-hidden sm:mt-[-120px] sm:mb-0 mb-5">
            <div className="inline-block mt-1">
              <Feather />
            </div>
            <div className="inline-block text-2xl sm:text-3xl ">feature 1</div>
          </div>

          <div className="overflow-hidden w-[100%] sm:mt-[-140px]">
            <svg
              className="sm:w-[436px] sm:h-[115px]"
              viewBox="0 0 436 115"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="436" height="27" fill="#D9D9D9" />
              <rect y="44" width="436" height="27" fill="#D9D9D9" />
              <rect y="88" width="436" height="27" fill="#D9D9D9" />
            </svg>
          </div>
        </div>
        {/*Col 2, Mobile Row 2*/}
        <div className="flex sm:h-full w-full mt-3 mb-22 overflow-hidden invisible sm:visible h-0 place-content-center">
          <div className="grow sm:ml-4 sm:ml-7 sm:mr-14">
            <div>
              <svg
                width="483"
                height="324"
                viewBox="0 0 483 324"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="483" height="324" fill="#E0E7EC" />
              </svg>
            </div>
          </div>
        </div>
        {/*Row 2*/}
        {/*Mobile, Disappears*/}
        <div className="flex w-full mt-3 sm:col-span-2 overflow-hidden sm:invisible sm:h-0 justify-center">
          <div className=".object-scale-down justify-center sm:ml-4 sm:ml-7 sm:mr-14 mx-auto">
            <svg
              width="483"
              height="324"
              viewBox="0 0 483 324"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="483" height="324" fill="#E0E7EC" />
            </svg>
          </div>
        </div>
        {/*Col 1*/}
        <div className="flex justify-items-end grid sm:grid-rows-2 sm:mt-20 w-[100%] sm:w-auto mt-28 mb-32 overflow:visible sm:mr-4 sm:mr-7">
          <div className="absolute sm:relative overflow-visible">
            <Footprints2 />
          </div>
          <div className="sm:mt-28 mt-[-110px] ">
            <div className="relative overflow-hidden sm:mt-[-250px] mb-5 sm:mb-0">
              <div className="inline-block mt-1">
                <Feather2 />
              </div>
              <div className="inline-block text-2xl sm:text-3xl ">
                feature 2
              </div>
            </div>
          </div>
          <div className="overflow-hidden w-[100%] mt-[-30px] sm:mt-[-150px]">
            <svg
              className="sm:w-[436px] sm:h-[115px]"
              viewBox="0 0 436 115"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="436" height="27" fill="#D9D9D9" />
              <rect y="44" width="436" height="27" fill="#D9D9D9" />
              <rect y="88" width="436" height="27" fill="#D9D9D9" />
            </svg>
          </div>
        </div>
        {/*Col 2*/}
        <div className="flex sm:h-full w-full sm:mt-10 overflow-hidden invisible sm:visible h-0 place-content-center sm:place-content-start">
          <div className=" ml-4 sm:ml-7 sm:mr-14">
            <svg
              width="483"
              height="324"
              viewBox="0 0 483 324"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="483" height="324" fill="#E0E7EC" />
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
        We plan on continuing moving towards the mission of making uCredit a tool that benefits a student’s career through the power of community. 
         <br></br><br></br>To do so, here are some features on our roadmap:<br></br><br></br>
          <li>Expanding the Roadmap Forum, making a general forum where students can ask each other career-related questions to peers and faculty or where they can interact and find opportunities with alumni and professionals.</li>
          <li>Incorporate ways to interact with other apps, such as Semester.ly.
</li>
          <li>Adapting to <a class="underline text-blue-600" href="https://hub.jhu.edu/2021/11/18/johns-hopkins-second-diversity-equity-inclusion-roadmap-draft/"> the university’s move towards By2</a> for planning degrees.
</li>
          <li>Continue to refine our user experience for all our stakeholders!
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

export default Team;
