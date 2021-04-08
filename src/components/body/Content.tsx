import React, { useState, useEffect } from "react";
import CourseBar from "./CourseBar";
import CourseList from "./course-list/CourseList";
import { Distribution } from "../commonTypes";
import Search from "./course-search/Search";
import { selectSearchStatus } from "../slices/searchSlice";
import { updateDistributions, selectPlan } from "../slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import InfoCards from "./info-bar/InfoCards";
import axios from "axios";
const api = "https://ucredit-api.herokuapp.com/api";

function Content() {
  const [distributions, setDistributions] = useState<Distribution[]>([]);
  const searching = useSelector(selectSearchStatus);
  const currentPlan = useSelector(selectPlan);
  const dispatch = useDispatch();

  useEffect(() => {
    getDistributions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlan]);

  // Sets all distributions for distribution bars.
  const getDistributions = () => {
    axios
      .get(api + "/distributionsByPlan/" + currentPlan._id)
      .then((retrievedData) => {
        const retrievedDistributions = retrievedData.data.data.sort(
          (distr1: Distribution, distr2: Distribution) =>
            distr2.required - distr1.required
        );
        setDistributions(retrievedDistributions);
        dispatch(updateDistributions(retrievedDistributions));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-row mt-content medium:px-48 w-full min-w-narrowest h-auto">
      <div className="flex flex-col mb-8 mx-4 w-courselist h-auto">
        <InfoCards />
        <CourseList />
      </div>
      <div className="h-coursebars flex-none mx-4 p-8 w-courebars bg-gray-coursebars border-2 rounded-xl">
        {distributions.map((dis) => {
          const name =
            dis.name.charAt(0).toUpperCase() +
            dis.name.substr(1, dis.name.length);
          return (
            <>
              <CourseBar
                maxCredits={dis.required}
                plannedCredits={dis.planned}
                currentCredits={dis.current}
                section={name}
              />
            </>
          );
        })}
      </div>
      {searching ? <Search /> : null}
    </div>
  );
}

export default Content;
