import Header from '../lib/components/landing-page/Header';
import Footer from '../lib/components/landing-page/Footer';
import Card from '../lib/components/landing-page/team-page/Card';
import ProfileMobile from '../lib/components/landing-page/team-page/profileMobile';
import teamList from '../lib/components/landing-page/team-page/teamList';

const Team: React.FC = () => {
  return (
    <div className="font-landingPage">
      <Header />
      <header className="bg-blue-header overflow-hidden ">
        <div className="w-full h-28 pb-12 overflow-hidden">
          <div className="text-center pb-3 py-7 text-5xl text-blue-footer ">
            Meet uCredit
          </div>
          <div className="pt-10 w-[160%] rounded-t-curvy bg-white h-[120px] relative overflow-hidden left-[-30%]"></div>
        </div>
      </header>

      <div className="bg-blue-header">
        <div className="text-center pb-7 py-5 text-3xl text-blue-footer bg-white">
          Current Members
        </div>
        <div className="text-center pb-10 bg-white">
          {/* desktop mode*/}
          <div className="hidden sm:block">
            <div className="container mx-auto px-8">
              <div className="grid smTablet:grid-cols-1 tablet:grid-cols-2 grid-cols-3 object-contain">
                {teamList.currentMember.map((person) => {
                  return (
                    <>
                      <div className="flex-initial justify-self-center px-4 py-4">
                        <Card
                          name={person.name}
                          role={person.role}
                          img={person.img}
                          class={person.class}
                          github={person.github}
                          linkedin={person.linkedin}
                          portfolio={person.portfolio}
                        />
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>

          {/* mobile mode*/}
          <div className="block sm:hidden">
            <div className="grid px-8 grid-cols-2 grid-rows-4 gap-4 place-items-center ">
              {teamList.currentMember.map((person) => {
                return (
                  <>
                    <div>
                      <ProfileMobile
                        name={person.name}
                        role={person.role}
                        img={person.img}
                        class={person.class}
                        github={person.github}
                        linkedin={person.linkedin}
                        portfolio={person.portfolio}
                      />
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>

        <div className="overflow-hidden bg-white">
          <div className="w-[160%] rounded-t-curvy bg-blue-header h-[350px] relative overflow-hidden left-[-30%] ">
            <div className="text-center text-3xl pt-6 text-blue-footer">
              Supervisor
            </div>
            <div className="text-center pb-10">
              {/* desktop mode*/}
              <div className="hidden sm:block">
                <div className="container mx-auto py-5 w-[0%]">
                  <div className="grid smTablet:grid-cols-1 tablet:grid-cols-2 grid-cols-3 object-contain">
                    {teamList.supervisor?.map((person) => {
                      return (
                        <>
                          <div className="flex-initial justify-self-center px-4 py-4">
                            <Card
                              name={person.name}
                              role={person.role}
                              img={person.img}
                              class={person.class}
                              github={person.github}
                              linkedin={person.linkedin}
                              portfolio={person.portfolio}
                            />
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* mobile mode*/}
              <div className="block sm:hidden">
                <div className="grid py-5 w-[200%] grid-cols-2 grid-rows-4 gap-4 place-items-center ">
                  {teamList.supervisor?.map((person) => {
                    return (
                      <>
                        <div>
                          <ProfileMobile
                            name={person.name}
                            role={person.role}
                            img={person.img}
                            class={person.class}
                            github={person.github}
                            linkedin={person.linkedin}
                            portfolio={person.portfolio}
                          />
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" overflow-hidden bg-blue-header">
          <div className="w-[160%] rounded-t-curvy bg-white h-[130px] relative overflow-hidden left-[-30%] "></div>
          <div className="text-center pb-7 text-3xl text-blue-footer bg-white">
            Alumni/Past Members
          </div>

          <div className="text-center pb-10 bg-white">
            {/* desktop mode*/}
            <div className="hidden sm:block">
              <div className="container mx-auto px-8">
                <div className="grid smTablet:grid-cols-1 tablet:grid-cols-2 grid-cols-3 object-contain pb-10">
                  {teamList.alumni.map((person) => {
                    return (
                      <>
                        <div className="flex-initial justify-self-center px-4 py-4">
                          <Card
                            name={person.name}
                            role={person.role}
                            img={person.img}
                            class={person.class}
                            github={person.github}
                            linkedin={person.linkedin}
                            portfolio={person.portfolio}
                          />
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* mobile mode*/}
            <div className="block sm:hidden bg-white">
              <div className="grid px-8 grid-cols-2 grid-rows-4 gap-4 place-items-center">
                {teamList.alumni.map((person) => {
                  return (
                    <>
                      <div>
                        <ProfileMobile
                          name={person.name}
                          role={person.role}
                          img={person.img}
                          class={person.class}
                          github={person.github}
                          linkedin={person.linkedin}
                          portfolio={person.portfolio}
                        />
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Team;
