/**
 * Contains features and values that our app embraces.
 */
import Bird from './BlueJay.svg';
import BgSVG from './BgSVG.svg';
import data from './introduceData';

const Laptop: React.FC = () => {
  return (
    <div className="">
      <br></br><br></br><br></br><br></br>
      <img className="w-2/3 absolute left-[70vw] top-[110vh]" src="/img/logo.png" alt="logo" />
      <div className="font-landingPage grid grid-rows-5 grid-cols-3 grid-flow-col gap-4 items-stretch">
        <div className="row-start-1 row-end-2 col-span-4 text-blue-footer text-center text-5xl">Introducing uCredit</div>
        <div className="px-60 row-span-1 col-span-4 text-center text-xl">
          A student-centered application packed with features like prereq checks, degree trackers, and beautiful UI that is easily shareable and accessible.
        </div>
      </div>


    </div>

  );
};

const Mobile: React.FC = () => {
  return (

    <div className="grid grid-cols-1 content-center items-center font-landingPage font-bold text-blue-footer text-left ml-20">
      <div className="text-2xl ">Our Features</div>
      <img className="w-2/3 absolute left-[60vw] top-[65vh]" src="/img/logo.png" alt="logo" />
      <div>
        {data.map((d) => {
          return (
            <>
            <br></br>
            <div className="flex flex-column align-left" key={d.title}>
              <div className="flex bg-gray-200 rounded-md">
                <img className="rounded-md" alt="" src={d.img} />
              </div>
              <div className="text-xl text-blue-footer">{d.title}</div>
            </div>
            </>
          )
        })}
      </div>
    </div>

  );
};


const Introduce: React.FC = () => {
  return (
    <>
      <div className="hidden sm:block"><Laptop /></div>
      <div className="block sm:hidden"><Mobile /></div>
    </>
  );
};

export default Introduce;
