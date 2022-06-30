import Links from './Links';

interface TeamMemberType {
  img: string;
  name: string;
  role: string;
  class?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
}

function Card(props: TeamMemberType) {
  const { img, name, role } = props;

  return (
    <div className="flex w-[320px] h-[200px] bg-white shadow-card rounded-lg py-1 pl-3 text-black font-landingPage">
      <img
        className="w-40 h-40 my-4 rounded-[15px] object-cover"
        src={img}
        alt="profile"
      />
      <div className="w-48 px-5 py-5">
        <div className="flex flex-col">
          <div>
            <p className="text-2xl text-left">{name}</p>
            <p className="mt-1 text-md text-left">{role}</p>
            {props.class && (
              <p className="my-1 text-md text-left">{`Class of ${props.class}`}</p>
            )}
          </div>

          <div>
            <Links linkedin={`${props.linkedin}`} github={`${props.github}`} portfolio={`${props.portfolio}`} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
