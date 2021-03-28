import { Course } from "./commonTypes";

interface DistributionColors {
  total: string[];
  naturalSciences: string[];
  humanities: string[];
  computerScience: string[];
  mathematics: string[];
  general: string[];
}

const DistributionColorsArray: DistributionColors = {
  total: ["#001B87", "#30E7ED", "#0058B3"],
  naturalSciences: ["#26D701", "#95F985", "#4DED30"],
  humanities: ["#E56AB3", "#FCBCD7", "#EF87BE"],
  computerScience: ["#DC1C13", "#F1959B", "#EA4C46"],
  mathematics: ["orange", "yellow", "gold"],
  general: ["#00A6D7", "#86FAF2", "#30E7ED"],
};

export const getColors = function (distribution: string): string[] | undefined {
  if (distribution === "Total Credits") {
    return DistributionColorsArray.total;
  } else if (distribution === "Natural Sciences") {
    return DistributionColorsArray.naturalSciences;
  } else if (distribution === "Computer Science") {
    return DistributionColorsArray.computerScience;
  } else if (distribution === "Humanities") {
    return DistributionColorsArray.humanities;
  } else if (distribution === "Mathematics") {
    return DistributionColorsArray.mathematics;
  } else if (distribution === "General Electives") {
    return DistributionColorsArray.general;
  }

  return undefined;
};

export const getCourses = (courseIds: string[]): Course[] => {
  const retrieved: Course[] = [];
  courseIds.forEach((id) => {
    // retrieve courses
    // if (id === testCourseFall._id) {
    //   retrieved.push(testCourseFall);
    // } else if (id === testCourseSpring._id) {
    //   retrieved.push(testCourseSpring);
    // }
  });

  return retrieved;
};
