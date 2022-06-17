import data from './promoData';
import BgSVG from './BgSVG.svg';
import {ReactComponent as BGSVG} from './bg.svg'

/**
 * Contains features and values that our app embraces.
 */
const Promo: React.FC = () => {
  return (

    <div className="flex flex-col px-16 pb-8 my-10 text-center bg-blue-header text-blue-footer font-landingPage">
      <div>
        {data.map((d) => {
          return !d.order ? (
            <>
            <br></br><br></br><br></br><br></br>
            <div className="flex flex-row" key={d.title}>
              <div className="w-2/3 pt-5">

              <div className="text-3xl mb-10 align-middle">{d.title}</div>
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
                <div className="text-3xl mb-10">{d.title}</div>
                <div className="text-black mb-8">{d.desc}</div>
              </div>
            </div>
            </>
          );
        })}
      </div>
    </div>
    
  );

};

export default Promo;
