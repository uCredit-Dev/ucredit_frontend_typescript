import data from './promoData';
import BgSVG from './BgSVG.svg';
import { ReactComponent as BGSVG } from './BgSVG.svg'
import Bird from './BlueJay.svg';

/**
 * Contains features and values that our app embraces.
 */
const Laptop: React.FC = () => {
  return (
    <>

      <img src="/img/landing-page/wave2.png" alt="wavy pattern" />
      <div className="flex flex-col px-16 pb-8 text-center bg-blue-header text-blue-footer font-landingPage">
        <div>
          {data.map((d) => {
            return !d.order ? (
              <>
                <br></br><br></br><br></br><br></br>
                <div className="flex flex-row" key={d.title}>
                  <div className="w-2/3 pt-5">

                    <div className="text-4xl mb-10 align-middle">{d.title}</div>
                    <div className="text-black">{d.desc}</div>
                  </div>

                  <div className="flex justify-center w-2/3 bg-gray-200 rounded-md">
                    <img className="rounded-md drop-shadow-2xl" alt="" src={d.img} />
                  </div>
                </div>
              </>
            ) : (
              <>
                <br></br><br></br><br></br><br></br>
                <div className="flex flex-row align-middle" key={d.title}>
                  <div className="flex justify-center w-1/3 h-1/3 bg-gray-200 rounded-md">
                    <img className="rounded-md drop-shadow-2xl" alt="" src={d.img} />
                  </div>
                  <div className="w-2/3 p-5 align-middle">
                    <div className="text-4xl mb-10">{d.title}</div>
                    <div className="text-black text-1xl mb-8">{d.desc}</div>
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
    <div className="grid grid-cols-1 content-center items-center font-landingPage font-bold text-blue-footer text-left">
      <img src="/img/landing-page/wave2.png" alt="wavy pattern" />
      <div className="flex flex-col px-16 pb-8 text-center bg-blue-header text-blue-footer font-landingPage">
        <div>
          {data.map((d) => {
            return (
              <>
                <br></br><br></br><br></br><br></br>
                <img className="rounded-md drop-shadow-2xl" alt="" src={d.img} />

                <div className="flex flex-column align-middle" key={d.mobiletitle}>
                  <div className="flex bg-gray-200 rounded-md">
                    <img className="rounded-md" alt="" src={d.mobileimg} />
                  </div>
                  
                  <div className="align-middle text-left">
                    <div className="text-xl text-blue-footer mb-10 align-middle">{d.mobiletitle}</div>
                    <div className="text-black ">{d.mobiledesc}</div>
                  </div>
                  
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div >

  );

};

const Promo: React.FC = () => {
  return (
    <>
      <div className="hidden sm:block"><Laptop /></div>
      <div className="block sm:hidden"><Mobile /></div>
    </>
  );
};

export default Promo;
