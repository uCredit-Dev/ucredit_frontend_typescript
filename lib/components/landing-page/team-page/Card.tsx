import Links from './Links';

interface TeamMemberType {
  img: string;
  name: string;
  role: string;
  class?: string;
  linkedin?: string;
  github?: string;
  email?: string
};



// shadow-[12px_0px_10px_-15px_rgba(31, 73, 125, 0.8)]
// shadow-[-12px_0_10px_-15px_rgba(31, 73, 125, 0.8)]
// shadow-[0px_12px_10px_-15px_rgba(31, 73, 125, 0.8)]
// shadow-[0px_-12px_10px_-15px_rgba(31, 73, 125, 0.8)]


function Card (props : TeamMemberType) {  
  const { img, name, role } = props;

  return (
    <div className="flex w-1/3 bg-white shadow-card rounded-lg py-1 pl-3 text-black font-landingPage">
      <img className="w-[40%] my-4 rounded-[15px] object-cover" src={img} alt="profile"/>
      <div className="w-[50%] px-5 py-2">
        <div className="flex flex-col">
          <p className="text-lg">{name}</p>
          <p className="mt-1 flex-1 text-sm">{role}</p>
          {props.class && <p className="mt-1 flex-1 text-sm">{`Class of ${props.class}`}</p>}
          
        <div>
          <Links linkedin={`${props.linkedin}`} 
            github={`${props.github}`}/>
        </div>
      </div>

    </div>
</div>
  )
}

export default Card;