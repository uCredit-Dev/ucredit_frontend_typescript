import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, resetUser } from "../../slices/userSlice";
import { useHistory } from "react-router-dom";
import { resetCurrentPlan } from "../../slices/currentPlanSlice";
import { api } from "../../resources/assets";
import bird from "../../resources/images/logoDarker.png";

/**
 * User login/logout buttons.
 */
const UserSection: FC<{
  loginId: string;
}> = ({ loginId }) => {
  // Redux setup
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  let history = useHistory();

  return (
    <div className="fixed z-20 p-3 px-6 w-screen h-20 bg-gradient-to-r shadow from-blue-500 to-green-400 select-none">
      <div className="flex flex-row items-center justify-end w-full h-full">
        {/* <div className="flex flex-row items-center justify-center mr-3 w-11 h-11 bg-white rounded-full"> */}
        {/* <UserSvg className="w-6 h-6 stroke-2" /> */}
        {/* </div> */}
        <div className="flex flex-row flex-grow items-center ml-5 text-white text-4xl italic font-bold">
          <img src={bird} alt="logo" className="mr-3 h-9"></img>
          <div>uCredit</div>
        </div>
        {window.innerWidth > 800 ? (
          <div className="mr-3 text-white font-semibold">
            Logged in as {user.name}!
          </div>
        ) : null}
        {user._id === "guestUser" ? (
          <a
            href="https://ucredit-api.herokuapp.com/api/login"
            className="flex flex-row items-center justify-center mr-3 w-24 h-9 hover:text-white hover:bg-blue-400 bg-white rounded cursor-pointer select-none transform hover:scale-105 transition duration-200 ease-in"
          >
            Log In
          </a>
        ) : (
          <button
            onClick={() => {
              fetch(api + "/retrieveUser/" + loginId, {
                mode: "cors",
                method: "DELETE",
                credentials: "include",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              })
                .then(() => {
                  dispatch(resetUser());
                  dispatch(resetCurrentPlan());
                  history.push("/login");
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
            className="flex flex-row items-center justify-center w-24 h-9 bg-white rounded focus:outline-none cursor-pointer select-none transform hover:scale-110 transition duration-200 ease-in"
          >
            Log Out
          </button>
        )}
      </div>
    </div>
  );
};

export default UserSection;
