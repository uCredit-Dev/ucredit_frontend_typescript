import React, { useState, useEffect } from "react";
import { testUser } from "../testObjs";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, selectUser } from "../slices/userSlice";
import { ReactComponent as UserSvg } from "../svg/user.svg";
import axios from "axios";
const api = "https://ucredit-api.herokuapp.com/api";

function UserSection() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [guest, setGuest] = useState<boolean>(true);

  useEffect(() => {
    console.log("in login useEffect");
    // Get test user
    if (user._id === "noUser" || user._id === "mliu78") {
      console.log("user is none");
      // Make call for backend
      axios
        .get(api + "/retrieveUser")
        .then((retrievedUser) => {
          console.log("retrieved ", retrievedUser);
          // dispatch(updateUser(retrievedUser.data));
          setGuest(false);
        })
        .catch((err) => {
          // Redirect to frontend login
          console.log("ERROR: ", err.message);
        });
    }
    dispatch(updateUser(testUser));
  }, []);

  return (
    <div className="flex flex-row items-center justify-end w-full h-full">
      <div className="flex flex-row items-center justify-center mr-3 w-11 h-11 bg-white rounded-full">
        <UserSvg className="w-6 h-6 stroke-2" />
      </div>
      {guest ? (
        <a
          href="https://ucredit-api.herokuapp.com/api/login"
          className="flex flex-row items-center justify-center mr-3 w-24 h-9 bg-white rounded cursor-pointer select-none transform hover:translate-x-0.5 hover:translate-y-0.5 transition duration-200 ease-in"
        >
          Log In
        </a>
      ) : (
        <div className="flex flex-row items-center justify-center w-24 h-9 bg-white rounded cursor-pointer select-none transform hover:translate-x-0.5 hover:translate-y-0.5 transition duration-200 ease-in">
          Log Out
        </div>
      )}
    </div>
  );
}

export default UserSection;
