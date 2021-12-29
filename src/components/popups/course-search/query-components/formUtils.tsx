import {
  AreaType,
  SearchExtras,
  SISRetrievedCourse,
} from "../../../../resources/commonTypes";

export const filterCourses = (
  extras: SearchExtras,
  courses: SISRetrievedCourse[]
): boolean | null => {
  if (extras.query.length > 0) {
    courses = courses.filter((course) => {
      if (
        extras.query.includes(".") ||
        !isNaN(parseInt(extras.query)) ||
        extras.query.startsWith("EN.") ||
        extras.query.startsWith("AS.")
      ) {
        return course.number.toLowerCase().includes(extras.query.toLowerCase());
      } else {
        return course.title.toLowerCase().includes(extras.query.toLowerCase());
      }
    });
  }

  let credits = extras.credits;
  if (credits !== null) {
    courses = processCredits(credits, courses);
  }

  const areas = extras.areas;
  if (areas !== null) {
    courses = processAreas(areas, courses);
  }

  const departments = extras.department;
  if (departments !== null) {
    courses = processDepartments(departments, courses);
  }

  const tags = extras.tags;
  if (tags !== null) {
    courses = processTags(tags, courses);
  }

  const levels = extras.levels;
  if (levels !== null) {
    courses = processLevels(levels, courses);
  }

  const wi = extras.wi;
  if (wi !== null) {
    courses = processWI(wi, courses);
  }

  const semester = extras.term + " " + extras.year;
  courses = courses.filter((course) => {
    let toReturn = false;
    course.terms.forEach((term) => {
      if (term === semester) {
        toReturn = true;
      }
    });
    return toReturn;
  });
  console.log(courses); // line 115 has sonarlint error for useless variable assignment, will prob need to modify this in the future
  return null;
};

const processCredits = (
  credits: string,
  courses: SISRetrievedCourse[]
): SISRetrievedCourse[] => {
  const creditsString = credits.toString();
  return courses.filter((course) => {
    let satisfied = false;
    creditsString.split("").forEach((c: string) =>
      course.versions.forEach((v) => {
        if (v.credits.toString() === c) {
          satisfied = true;
        }
      })
    );
    return satisfied;
  });
};

const processAreas = (
  areas: AreaType,
  courses: SISRetrievedCourse[]
): SISRetrievedCourse[] => {
  return courses.filter((course) => {
    let satisfied = false;
    areas.split("").forEach((a: string) =>
      course.versions.forEach((v) => {
        if (v.areas.includes(a)) {
          satisfied = true;
        }
      })
    );
    return satisfied;
  });
};

const processDepartments = (
  departments: string,
  courses: SISRetrievedCourse[]
): SISRetrievedCourse[] => {
  return courses.filter((course) => {
    let satisfied = false;
    departments.split("|").forEach((d: string) =>
      course.versions.forEach((v) => {
        if (v.department === d) {
          satisfied = true;
        }
      })
    );
    return satisfied;
  });
};

const processTags = (
  tags: string,
  courses: SISRetrievedCourse[]
): SISRetrievedCourse[] => {
  return courses.filter((course) => {
    let satisfied = false;
    tags.split("|").forEach((t: string) =>
      course.versions.forEach((v) => {
        if (v.tags.includes(t)) {
          satisfied = true;
        }
      })
    );
    return satisfied;
  });
};

const processLevels = (
  levels: string,
  courses: SISRetrievedCourse[]
): SISRetrievedCourse[] => {
  return courses.filter((course) => {
    let satisfied = false;
    course.versions.forEach((v) => {
      levels.split("|").forEach((level) => {
        if (v.level === level) {
          satisfied = true;
        }
      });
    });
    return satisfied;
  });
};

const processWI = (
  wi: boolean,
  courses: SISRetrievedCourse[]
): SISRetrievedCourse[] => {
  return courses.filter((course) => {
    let satisfied = false;
    course.versions.forEach((v) => {
      if (v.wi && wi) {
        satisfied = true;
      }
    });
    return satisfied;
  });
};
