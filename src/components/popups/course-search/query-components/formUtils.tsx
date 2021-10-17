import {
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
    const creditsString = credits.toString();
    courses = courses.filter((course) => {
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
  }

  const areas = extras.areas;
  if (areas !== null) {
    courses = courses.filter((course) => {
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
  }

  const departments = extras.department;
  if (departments !== null) {
    courses = courses.filter((course) => {
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
  }

  const tags = extras.tags;
  if (tags !== null) {
    courses = courses.filter((course) => {
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
  }

  const levels = extras.levels;
  if (levels !== null) {
    courses = courses.filter((course) => {
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
  }

  const wi = extras.wi;
  if (wi !== null) {
    courses = courses.filter((course) => {
      let satisfied = false;
      course.versions.forEach((v) => {
        if (v.wi && wi) {
          satisfied = true;
        }
      });
      return satisfied;
    });
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
  return null;
};
