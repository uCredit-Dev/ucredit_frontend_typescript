/**
 * User login/logout buttons.
 */
const Header: React.FC = () => {
  return (
    <div className="absolute z-20 w-full h-16 p-3 px-6 select-none bg-primary">
      <div className="flex flex-row items-center justify-end w-full h-full">
        {/* <div className="flex flex-row items-center justify-center mr-3 bg-white rounded-full w-11 h-11"> */}
        {/* <UserSvg className="w-6 h-6 stroke-2" /> */}
        {/* </div> */}
        <div className="flex flex-row items-center flex-grow ml-5 text-3xl font-bold text-white">
          <img src="/img/logo-darker.png" alt="logo" className="mr-3 h-9"></img>
          <div>uCredit</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
