import {
  Major,
  Plan,
  ReviewMode,
  SemesterType,
  UserCourse,
  Year,
} from '../../resources/commonTypes';
import { FC, useEffect, useState } from 'react';
import Semester from '../dashboard/course-list/horizontal/Semester';
import { toast } from 'react-toastify';
import { statusReadable } from '../../../pages/reviewer';
import { userService } from '../../services';
import DistributionBarsJSX from '../dashboard/degree-info/DistributionBarsJSX';
import { allMajors } from '../../resources/majors';
import Dropdown from './Dropdown';

// Implement next plan/student and additional info
const PlanSummary: FC<{
  plan: Plan;
  notifState: boolean;
  setNotifState: (notifState: boolean) => void;
  review_id: string;
  setRefreshReviews: (refreshReviews: boolean) => void;
}> = ({ plan, notifState, setNotifState, review_id, setRefreshReviews }) => {
  const [semester, setSemester] = useState<SemesterType>('Fall');
  const [year, setYear] = useState<Year>(plan.years[0]);
  const [courses, setCourses] = useState<UserCourse[]>(plan.years[0].courses);
  const [majors, setMajors] = useState<Major[]>([]);
  const [selectedMajor, setSelectedMajor] = useState<Major>(allMajors[0]);
  const [semesters, setSemesters] = useState([]);

  const getNextSem = (): { year: Number; semester: SemesterType } => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    if (month < 9 && month > 0) return { year: year, semester: 'Fall' };
    else return { year: year + 1, semester: 'Spring' };
  };

  useEffect(() => {
    const { year, semester } = getNextSem();
    const majorAcc = [];
    plan.majors.forEach((m) => {
      allMajors.forEach((ma) => {
        if (ma.degree_name === m) majorAcc.push(ma);
      });
    });
    setMajors(majorAcc);
    const semesterAcc = [];
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
        const semesterCourses = [];
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
      if (y.year === year.year) {
        setYear(y);
        setSemester(semester);
        const semesterCourses = [];
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
      await userService.changeReviewStatus(review_id, value.toUpperCase());
      setRefreshReviews(true);
      setNotifState(false);
      toast.success(`Status changed to ${statusReadable[value.toUpperCase()]}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      {notifState ? (
        <div
          className="fixed z-10 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-[40rem] sm:w-full">
              <div className="flex flex-row bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div>
                  <div className="ml-4 mt-4">
                    <Dropdown
                      width={200}
                      options={semesters}
                      onChange={async (values) => {
                        const value = values[0];
                        if (!value) return;
                        const split = value.label.split(' ');
                        setSemester(split[0]);
                        plan.years.forEach((y) => {
                          if (y.year === parseInt(split[1])) setYear(y);
                        });
                      }}
                      _default={semester + ' ' + year}
                    />
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
                  <p className="text-sm text-gray-500">
                    Here is a summary of the student's courses
                  </p>
                </div>
                <div className="m-4 w-96">
                  <Dropdown
                    width={300}
                    options={majors.map((m) => ({
                      label: m.degree_name,
                      content: m.degree_name,
                    }))}
                    onChange={async (values) => {
                      const value = values[0];
                      if (!value) return;
                      allMajors.forEach((m) => {
                        if (m.degree_name === value.label) setSelectedMajor(m);
                      });
                    }}
                    _default={allMajors[0].degree_name}
                  />
                  <DistributionBarsJSX major={selectedMajor} />
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={updateStatus(statusReadable.REJECTED)}
                >
                  Reject
                </button>
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={updateStatus(statusReadable.APPROVED)}
                >
                  Accept
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setNotifState(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PlanSummary;
