import CourseBar from "./CourseBar";
import { FC, useEffect, useState } from "react";
import { Major } from "../../../resources/commonTypes";
import {
  selectDistributionBarJSX,
  selectTotalCredits,
} from "../../../slices/currentPlanSlice";
import { useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";

/**
 * Distribution Bars in Components
 * @param major - major to display
 * @param distributionOpen - boolean to open or close distribution
 */
const DistributionBars: FC<{
  major: Major | null;
  distributionOpen: boolean;
}> = (props) => {
  const totalCredits = useSelector(selectTotalCredits);
  const distributionJSX = useSelector(selectDistributionBarJSX);

  const [displayGeneral] = useState<boolean>(true); // Sets all distributions for distribution bars.
  useEffect(() => {
    ReactTooltip.rebuild();
  }, [displayGeneral, props.major]);

  return (
    <div>
      <CourseBar
        distribution={{
          name: "Total Credits",
          expr: "",
          required_credits:
            props.major !== null ? props.major.total_degree_credit : 0,
          fulfilled_credits: totalCredits,
          description:
            props.major !== null
              ? "This is the total amount of credits that is required for " +
                props.major.degree_name
              : "",
        }}
        general={true}
      />{" "}
      {distributionJSX}
    </div>
  );
};

export default DistributionBars;
