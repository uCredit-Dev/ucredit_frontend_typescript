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
      <div>{section}</div>
      <div>
        Bar here {maxCredits}|{plannedCredits}|{currentCredits}
      </div>
    </>
  );
}

export default CourseBar;
