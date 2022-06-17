/**
 * Contains features and values that our app embraces.
 */
import BgSVG from './BgSVG.svg';
const Introduce: React.FC = () => {
  return (
  <>
    <br></br><br></br><br></br><br></br>
    <div className="font-landingPage  grid grid-rows-5 grid-cols-3 grid-flow-col gap-4 items-stretch">
    <div className="row-start-1 row-end-2 col-span-4 text-blue-footer text-center text-5xl">Introducing uCredit</div>
    <div className="px-60 row-span-1 col-span-4 text-center text-xl">
     A student-centered application packed with features like prereq checks, degree trackers, and beautiful UI that is easily shareable and accessible.
    </div>
    <br></br><br></br><br></br><br></br>
    
    </div>
  </>
 
  );
};

export default Introduce;
