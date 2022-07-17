import data from './promoData';

/**
 * Contains features and values that our app embraces.
 */
const Laptop: React.FC = () => {
  return (
    <>
      <img
        src="/img/landing-page/wave2.png"
        alt="wavy pattern"
        className="w-screen"
      />

      <div className="flex flex-col px-16 pb-8 text-center bg-blue-header text-blue-footer font-landingPage">
        <div>
          {data.map((d) => {
            return !d.order ? (
              <>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div className="flex flex-row" key={d.title}>
                  <div className="w-2/3 pt-10 pr-10 items-center">
                    <div className="text-4xl mb-10 align-middle xxxl:text-[60px] xxxl:w-[1200px] xxxl:leading-[80px]">
                      {d.title}
                    </div>
                    <div className="text-black text-2xl xxxl:text-[35px] xxxl:w-[1400px] xxxl:mt-[60px] xxxl:leading-[60px]">
                      {d.desc}
                    </div>
                  </div>

                  <div className="flex justify-center w-2/3 bg-gray-200 rounded-md">
                    <img
                      className="rounded-md drop-shadow-2xl"
                      alt=""
                      src={d.img}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div className="flex flex-row align-middle" key={d.title}>
                  <div className="flex justify-center w-1/3 h-1/3 bg-gray-200 rounded-md">
                    <img
                      className="rounded-md drop-shadow-2xl"
                      alt=""
                      src={d.img}
                    />
                  </div>

                  <div className="w-2/3 p-10 align-middle items-center ">
                    <div className="text-4xl mb-10 xxxl:text-[60px] xxxl:w-[1200px] xxxl:leading-[80px]">
                      {d.title}
                    </div>
                    <div className="text-black text-2xl xxxl:text-[35px] xxxl:w-[1400px] xxxl:mt-[100px] xxxl:leading-[60px]">
                      {d.desc}
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

const Mobile: React.FC = () => {
  return (
    <div className="grid grid-cols-1 content-center items-center font-landingPage text-blue-footer text-left">
      <img src="/img/landing-page/wave2.png" alt="wavy pattern" />
      <div className="flex flex-col px-10 pb-8 text-center bg-blue-header text-blue-footer font-landingPage">
        <div>
          {data.map((d) => {
            return (
              <>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <img
                  className="rounded-md drop-shadow-2xl"
                  alt=""
                  src={d.img}
                />

                <div className="pt-10">
                  <div className="bg-gray-100 rounded-md">
                    <img className="rounded-md" alt="" src={d.mobileimg} />
                  </div>

                  <div className="ml-12 -mt-10 align-middle text-left items-center">
                    <div className="text-xl font-bold text-blue-footer mb-5 align-middle">
                      {d.mobiletitle}
                    </div>
                    <div className="text-black">{d.mobiledesc}</div>
                  </div>
                </div>
              </>
            );
          })}
        </div>

        <img
          className="rounded-md drop-shadow-2xl mt-20"
          alt=""
          src="/img/landing-page/trustworthy.png"
        />

        <div className="pt-10">
          <div className="bg-gray-100 rounded-md w-90">
            <img
              className="rounded-md"
              alt=""
              src="/img/landing-page/GraduateMobile.png"
            />
          </div>
          <div className="ml-12 -mt-10 align-middle text-left items-center">
            <div className="text-xl font-bold text-blue-footer mb-5 align-middle">
              Graduate with assurance
            </div>
            <div className="text-black">
              Share your course plan with academic advisor to make sure you
              graduate on time without missing any requirement!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Promo: React.FC = () => {
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

export default Promo;
