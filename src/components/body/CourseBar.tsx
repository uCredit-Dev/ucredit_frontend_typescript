import React, { useState, useEffect } from "react";
import { getColors } from "../assets";

type courseBarProps = {
  maxCredits: number;
  majorCredits: number;
  plannedCredits: number;
  currentCredits: number;
  section: string;
};

function CourseBar({
  maxCredits,
  majorCredits,
  plannedCredits,
  currentCredits,
  section,
}: courseBarProps) {
  return <div></div>;
}

export default CourseBar;
