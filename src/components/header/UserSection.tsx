import React, { useEffect, useState } from "react";
import { selectUser } from "../slices/userSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import { User } from "../commonTypes";
import { testUser } from "../testObjs";
import { useDispatch } from "react-redux";
import { updateUser } from "../slices/userSlice";
import { ReactComponent as UserSvg } from "../svg/user.svg";
import clsx from "clsx";
const api = "https://ucredit-api.herokuapp.com/api";

function UserSection() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [logoutDown, setLogoutDown] = useState<boolean>(false);

  useEffect(() => {
    //retrieveUser();
    // fetch(api + '/login')
    //   .then((retrieved) => {
    //     // Redirect url?
    //     const url = retrieved.url;
    //     window.location.href = url; // redirect to sso login?
    //   })
    //   .catch((err) => console.log('ERROR: ', err.message));

    // axios
    //   .get(api + '/login')
    //   .then((retrievedUser) => {console.log('retrieved ', retrievedUser)})
    //   .catch((err) => console.log('ERROR: ', err.message));

    // Get test user
    dispatch(updateUser(testUser));
  }, []);

  return (
    <div className="flex flex-row items-center justify-end w-full h-full">
      <div className="flex flex-row items-center justify-center mr-3 w-11 h-11 bg-white rounded-full">
        <UserSvg className="w-8 h-8" />
      </div>
      <div
        className={clsx(
          "flex flex-row items-center justify-center w-24 h-9 bg-white rounded-lg cursor-pointer select-none",
          { "ring-2 ring-green-200": logoutDown }
        )}
        onMouseDown={() => setLogoutDown(true)}
        onMouseUp={() => setLogoutDown(false)}
      >
        LOG OUT
      </div>
    </div>
  );
}

export default UserSection;
