import Header from '../lib/components/landing-page/Header';
import Footer from '../lib/components/landing-page/Footer';
import Card from '../lib/components/landing-page/team-page/Card';
import ProfileMobile from '../lib/components/landing-page/profileMobile';

const Team: React.FC = () => {
  return (
    <div className="font-landingPage">
      <Header />
      <header className="bg-blue-header overflow-hidden ">
        <div className="w-full h-28 pb-12 overflow-hidden">
          <div className="text-center pb-7 text-2xl font-bold text-blue-footer ">
            Meet the Team
          </div>

          <div className="pt-10 w-[160%] rounded-t-curvy bg-white h-[120px] relative overflow-hidden left-[-30%]"></div>
        </div>
      </header>
      <div className="bg-blue-header">
        <div className="text-center pb-7 text-2xl text-blue-footer bg-white">
          Current Members
        </div>
        <div className="text-center pb-10 bg-white">Cards</div>

        {/* Supervisor Section */}
        <div className=" overflow-hidden bg-white">
          <div className="w-[160%] rounded-t-curvy bg-blue-header h-[120px] relative overflow-hidden left-[-30%] ">
            <div className="text-center text-2xl pt-6 font-bold text-blue-footer">
              Supervisor
            </div>
          </div>
        </div>
        <div className="text-center pb-10 ">Cards</div>

        <div className=" overflow-hidden bg-blue-header">
          <div className="w-[160%] rounded-t-curvy bg-white h-[120px] relative overflow-hidden left-[-30%] "></div>
        </div>
      </div>
      <div className="text-center pb-10 bg-white">Cards</div>

      <Footer />
    </div>
  );
};

export default Team;
