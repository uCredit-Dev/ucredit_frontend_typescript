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
    <div className="flex flex-row flex-wrap-reverse mt-content medium:px-48 h-full">
      <div className="flex-grow ml-3 mr-2 h-auto">
        <CourseList />
      </div>
      <div className="flex flex-col justify-center ml-auto mr-auto my-4 w-coursebars h-auto">
        <div className="mr-4">
          <InfoCards />
        </div>
        <div className="flex-none mr-4 p-6 h-auto bg-white rounded shadow">
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
                  <>
                    <CourseBar
                      maxCredits={dis.required}
                      plannedCredits={dis.planned}
                      currentCredits={dis.current}
                      section={name}
                    />
                  </>
                );
              })
            : null}
        </div>
        {searching ? <Search /> : null}
      </div>
    </div>
  );
}

export default Content;
