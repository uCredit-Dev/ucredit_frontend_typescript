import React from "react";

type courseBarProps = {
  maxCredits: number;
  plannedCredits: number;
  currentCredits: number;
  section: string;
};

function CourseBar({
  maxCredits,
  plannedCredits,
  currentCredits,
  section,
}: courseBarProps) {
  return (
    <>
      <div className='text mb-1'>{section}</div>
      {/* <div>
        Bar here {maxCredits}|{plannedCredits}|{currentCredits}
      </div> */}
      <div className='flex flex-row mb-2 w-full h-6 bg-gray-200 rounded'>
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
