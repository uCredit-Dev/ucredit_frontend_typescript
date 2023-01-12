import {
  Plan,
  ReviewMode,
  SemesterType,
  UserCourse,
  Year,
} from '../../resources/commonTypes';
import React, { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Selectable } from '@robertz65/lyte';
import Semester from '../dashboard/course-list/Semester';
import { statusReadable } from '../../../pages/reviewer';
import { userService } from '../../services';
import DistributionBarsJSX from '../dashboard/degree-info/DistributionBarsJSX';
import { selectToken } from '../../slices/userSlice';
import { useSelector } from 'react-redux';
import { allMajorNames } from '../../resources/majors';

const getNextSem = (): { year: Number; semester: SemesterType } => {
  const date = new Date();
  const currYear = date.getFullYear();
  const currMonth = date.getMonth();
  if (currMonth < 9 && currMonth > 0)
    return { year: currYear, semester: 'Fall' };
  else return { year: currYear + 1, semester: 'Spring' };
};

// Implement next plan/student and additional info
const PlanSummary: FC<{
  plan: Plan;
  setNotifState: (notifState: boolean) => void;
  review_id: string;
  setRefreshReviews: (refreshReviews: boolean) => void;
}> = ({ plan, setNotifState, review_id, setRefreshReviews }) => {
  const [semester, setSemester] = useState<SemesterType>(getNextSem().semester);
  const [year, setYear] = useState<Year>(
    (() => {
      for (let y of plan.years) {
        if (y.year === getNextSem().year) return y;
      }
      return plan.years[0];
    })(),
  );
  const [courses, setCourses] = useState<UserCourse[]>(plan.years[0].courses);
  const [majors, setMajors] = useState<string[]>([]);
  const [selectedMajor, setSelectedMajor] = useState<string>(allMajorNames[0]);
  const [semesters, setSemesters] = useState<
    { label: string; content: string }[]
  >([]);
  const token = useSelector(selectToken);

  useEffect(() => {
    const { year, semester } = getNextSem();
    const majorAcc: string[] = [];
    plan.major_ids.forEach((m) => {
      allMajorNames.forEach((ma) => {
        if (ma === m) majorAcc.push(ma);
      });
    });
    setMajors(majorAcc);
    setSelectedMajor(majorAcc[0]);
    const semesterAcc: { label: string; content: string }[] = [];
    plan.years.forEach((y) => {
      if (y.year === 0) {
        semesterAcc.push({
          label: 'All ' + plan.years[0].year,
          content: 'AP/Transfer',
        });
      } else {
        semesterAcc.push({
          label: 'Fall ' + y.year,
          content: 'Fall ' + y.year,
        });
        semesterAcc.push({
          label: 'Spring ' + y.year,
          content: 'Spring ' + y.year,
        });
        semesterAcc.push({
          label: 'Summer ' + y.year,
          content: 'Summer ' + y.year,
        });
        semesterAcc.push({
          label: 'Intersession ' + y.year,
          content: 'Intersession ' + y.year,
        });
      }
      if (y.year === year) {
        setYear(y);
        setSemester(semester);
        const semesterCourses: UserCourse[] = [];
        y.courses.forEach((c) => {
          if (c.term === semester.toLowerCase()) semesterCourses.push(c);
        });
        setCourses(semesterCourses);
      }
      setSemesters(semesterAcc);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plan._id]);

  useEffect(() => {
    plan.years.forEach((y) => {
      if (year && y.year === year.year) {
        setYear(y);
        setSemester(semester);
        const semesterCourses: UserCourse[] = [];
        y.courses.forEach((c) => {
          if (c.term === semester.toLowerCase()) semesterCourses.push(c);
        });
        setCourses(semesterCourses);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [semester, year]);

  const updateStatus = (value) => async () => {
    try {
      await userService.changeReviewStatus(
        review_id,
        value.toUpperCase(),
        token,
      );
      setRefreshReviews(true);
      setNotifState(false);
      toast.success(
        `Status changed to ${statusReadable[value.toUpperCase()]}`,
        {
          toastId: 'status updated',
        },
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[60] overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          aria-hidden="true"
        ></div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white text-left rounded-lg shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-[40rem] sm:w-full max-h-5/6 overflow-y-auto">
          <div className="flex flex-row px-4 pt-5 pb-4 bg-white rounded-lg sm:p-6 sm:pb-4">
            <div>
              <div className="mt-4 ml-4">
                {semesters.length > 1 && (
                  <Selectable
                    width={242}
                    options={semesters}
                    onChange={async (values) => {
                      const value = values[0];
                      if (!value) return;
                      const split = (value.label as string).split(' ');
                      setSemester(split[0] as any);
                      plan.years.forEach((y) => {
                        if (y.year === parseInt(split[1])) setYear(y);
                      });
                    }}
                    defaultValue={
                      getNextSem().semester +
                      ' ' +
                      (() => {
                        for (let y of plan.years) {
                          if (y.year === getNextSem().year) return y.year;
                        }
                      })()
                    }
                  />
                )}
              </div>
              <Semester
                semesterName={semester}
                semesterYear={year}
                courses={courses}
                mode={ReviewMode.View}
                display={true}
              />
              {/* <InfoMenu plan={plan} mode={ReviewMode.View}/> */}
              {/* <Distributions
                  major={plan.majors[0]}
                  userMajors={plan.majors}
                  changeDisplayMajor={changeDisplayMajor}
                  distributionBarsJSX={distributionBarsJSX}
                /> */}
              <p className="px-5 mt-2 text-sm text-center text-gray-500">
                Here is a summary of the student's courses
              </p>
            </div>
            <div className="m-4 overflow-auto max-h-screen">
              {majors.length > 0 && (
                <Selectable
                  width={'100%'}
                  options={majors.map((m) => {
                    return {
                      label: m,
                      content: m.toString(),
                    };
                  })}
                  onChange={async (values) => {
                    const value = values[0];
                    if (!value) return;
                    allMajorNames.forEach((m) => {
                      if (m === value.label) setSelectedMajor(m);
                    });
                  }}
                  defaultValue={
                    allMajorNames[0] ? allMajorNames[0] : 'loading...'
                  }
                />
              )}
              <DistributionBarsJSX selectedMajor={selectedMajor} />
            </div>
          </div>
          <div className="px-4 py-3 rounded-b-lg bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse ">
            <button
              type="button"
              className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={updateStatus(statusReadable.REJECTED)}
            >
              Reject
            </button>
            <button
              type="button"
              className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={updateStatus(statusReadable.APPROVED)}
            >
              Accept
            </button>
            <button
              type="button"
              className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => setNotifState(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanSummary;
