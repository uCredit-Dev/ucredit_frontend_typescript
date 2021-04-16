import React from "react";
import ReactTooltip from "react-tooltip";

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
  const tooltip = `<div style='width: 90px; height: auto;'><div style='width: 100%; display: flex; flex-direction: row; justify-content: space-between;'><div>Planned</div><div>${plannedCredits}</div></div><div style='display: flex; flex-direction: row; justify-content: space-between;'><div>Remaining</div><div>${
    maxCredits - plannedCredits
  }</div></div></div>`;

  return (
    <>
      <ReactTooltip html={true} />
      <div className='text mb-1'>{section}</div>
      {/* <div>
        Bar here {maxCredits}|{plannedCredits}|{currentCredits}
      </div> */}
      <div
        className='justif flex flex-row mb-2 w-full h-6 bg-gray-200 rounded'
        data-tip={tooltip}>
        <div
          className='h-full bg-secondary rounded'
          style={{
            width: `${(plannedCredits / maxCredits) * 100}%`,
          }}></div>
      </div>
    </>
  );
}

export default CourseBar;
