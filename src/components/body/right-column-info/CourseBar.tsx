import React from "react";
import ReactTooltip from "react-tooltip";
import { ReactComponent as CheckSvg } from "../../svg/Check.svg";

type courseBarProps = {
  maxCredits: number;
  plannedCredits: number;
  currentCredits: number;
  section: string;
};

function CourseBar({
  maxCredits,
  plannedCredits,
  currentCredits: _,
  section,
}: courseBarProps) {
  const remainingCredits =
    plannedCredits <= maxCredits ? maxCredits - plannedCredits : 0;

  const tooltip =
    `<div style='width: 90px; height: auto;'><div style='width: 100%; display: flex; flex-direction: row; justify-content: space-between;'>` +
    `<div>Planned</div><div>${plannedCredits}</div></div><div style='display: flex; flex-direction: row; justify-content: space-between;'>${
      remainingCredits !== 0
        ? `<div>Remaining</div><div>${remainingCredits}</div></div>`
        : `<div style="width: 100%; height: auto; display: flex; flex-direction: row; justify-content: center">Completed!</div>`
    }</div>`;

  return (
    <>
      <ReactTooltip html={true} />
      <div className="text mb-1" key={section}>
        {section}
      </div>
      {/* <div>
        Bar here {maxCredits}|{plannedCredits}|{currentCredits}
      </div> */}
      <div
        className="relative flex flex-row mb-2 w-full h-6 bg-gray-200 rounded"
        data-tip={tooltip}
      >
        <div
          className="h-full bg-secondary rounded"
          style={{
            width: `${
              plannedCredits <= maxCredits
                ? (plannedCredits / maxCredits) * 100 + "%"
                : "100%"
            }`,
          }}
        />
        {remainingCredits === 0 ? (
          <CheckSvg className="absolute left-1/2 top-1/2 w-5 h-5 text-white stroke-2 transform -translate-x-1/2 -translate-y-1/2" />
        ) : null}
      </div>
    </>
  );
}

export default CourseBar;
