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
    <div className="flex w-[350px] h-[200px] bg-white shadow-lg rounded-lg py-1 pl-3 text-black font-landingPage">
      <img
        className="w-[125px] my-4 mx-2 rounded-[30px] object-cover"
        src={img}
        alt="profile"
      />
      <div className="w-48 px-4 py-7">
        <div className="flex flex-col">
          <div>
            <p className="text-2xl text-left">{name}</p>
            <p className="mt-1 text-md text-left">{role}</p>
            {props.class && (
              <p className="my-1 text-md text-left">{`Class of ${props.class}`}</p>
            )}
          </div>

          <div className="-mx-2 my-7">
            <Links linkedin={`${props.linkedin}`} github={`${props.github}`} portfolio={`${props.portfolio}`} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
