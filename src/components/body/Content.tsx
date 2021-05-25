import React, { useState, useEffect } from "react";
import CourseBar from "./right-column-info/CourseBar";
import CourseList from "./course-list/CourseList";
import { Distribution } from "../commonTypes";
import Search from "./course-search/Search";
import { selectSearchStatus } from "../slices/searchSlice";
import { selectDeleteStatus } from "../slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import InfoCards from "./right-column-info/InfoCards";
import axios from "axios";
import DeletePlanPopup from "./DeletePlanPopup";
import { selectPlan, updateDistributions } from "../slices/currentPlanSlice";

const api = "https://ucredit-api.herokuapp.com/api";

/* 
  Holds all dashboard components.
*/
function Content() {
  const [distributions, setDistributions] = useState<Distribution[]>([]);
  const searching = useSelector(selectSearchStatus);
  const currentPlan = useSelector(selectPlan);
  const deleteStatus = useSelector(selectDeleteStatus);
  const dispatch = useDispatch();

  // Gets distribution everytime a plan changes.
  useEffect(() => {
    getDistributions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlan]);

  // Sets all distributions for distribution bars.
  const getDistributions = () => {
    if (currentPlan._id !== "noPlan") {
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
        .catch((err) => {
          if (currentPlan.user_id === "guestUser") {
            console.log(
              "In guest user! This is expected as there are no users with this id."
            );
          } else {
            console.log(err);
          }
        });
    }
  };

  const [distributionOpen, setDistributionOpen] = useState<boolean>(true);

  return (
    // <div className="flex flex-row flex-wrap-reverse mt-content medium:px-48 h-full">
    <div className="flex flex-row flex-wrap-reverse mt-content medium:px-48 h-full">
      <div className="flex-grow h-auto">
        <CourseList />
      </div>
      <div className="flex flex-col ml-auto mr-auto my-4 w-coursebars h-auto">
        <div className="ml-4 mr-4">
          <InfoCards />
        </div>
        <div className="flex-none ml-4 mr-4 p-6 h-auto bg-white rounded shadow">
          <div className="flex flex-row mb-3 w-full">
            <div className="self-start text-xl font-medium">
              Overall Distribution
            </div>
            <div className="relative flex-grow">
              <button
                className="absolute bottom-0 right-0 underline"
                onClick={() => {
                  setDistributionOpen(!distributionOpen);
                }}
              >
                {distributionOpen ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          {distributionOpen
            ? distributions.map((dis) => {
                const name =
                  dis.name.charAt(0).toUpperCase() +
                  dis.name.substr(1, dis.name.length);
                return (
                  <div key={name}>
                    <CourseBar
                      maxCredits={dis.required}
                      plannedCredits={dis.planned}
                      currentCredits={dis.current}
                      section={name}
                    />
                  </div>
                );
              })
            : null}
        </div>
        {searching ? <Search /> : null}
        {deleteStatus ? <DeletePlanPopup /> : null}
      </div>
    </div>
  );
}

export default Content;
