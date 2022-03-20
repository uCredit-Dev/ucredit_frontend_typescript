import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { Major, ReviewMode } from '../../../resources/commonTypes';
import { selectTotalCredits } from '../../../slices/currentPlanSlice';
import { selectReviewMode } from '../../../slices/userSlice';
import CourseBar from './CourseBar';
import Reviewers from './Reviewers/Reviewers';

/**
 * Area in the right hand plan information that shows various elements of degree progression.
 */
const Distributions: FC<{
  distributionOpen: boolean;
  setDistributionOpen: (open: boolean) => void;
  major: Major | null;
  userMajors: string[];
  distributionBarsJSX: JSX.Element[];
  changeDisplayMajor: Function;
}> = ({
  distributionOpen,
  setDistributionOpen,
  major,
  userMajors,
  distributionBarsJSX,
  changeDisplayMajor,
}) => {
  // Component state setup.
  const totalCredits = useSelector(selectTotalCredits);
  const [disclaimer, setDisclaimer] = useState<boolean>(false);
  const reviewMode = useSelector(selectReviewMode);

  const majorOptions = userMajors.map((m, index) => ({
    value: index,
    label: m,
  }));

  const getHref = (): string => {
    return major !== null ? major.url : '';
  };

  return (
    <div className="z-50 flex-none h-auto p-6 bg-white rounded shadow w-96">
      <div className="flex flex-row w-full mb-3">
        <div className="self-start text-2xl font-medium">Main Plan</div>
        {/* Degree Progress */}
        <button
          className="w-24 h-6 mt-1 ml-1 text-center bg-red-100 rounded"
          onClick={() => setDisclaimer(!disclaimer)}
        >
          Please read
        </button>
        <div className="relative flex-grow">
          <button
            className="absolute right-0 underline transition duration-200 ease-in transform bottom-1 focus:outline-none hover:scale-110"
            onClick={() => setDistributionOpen(!distributionOpen)}
          >
            {distributionOpen ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>
      {userMajors.length > 1 && (
        <Select
          options={majorOptions}
          value={majorOptions.find(({ label }) => label === major?.degree_name)}
          onChange={(event) => {
            changeDisplayMajor(event?.label);
          }}
          placeholder="Select Majors"
          className="z-50 w-full"
          hideSelectedOptions
        />
      )}
      {disclaimer && (
        <div>
          <b> This feature is still being refined. </b> Degree criteria on
          uCredit is currently implemented by hand to match as closely to
          university requirements as possible. However, there may be some
          inconsistencies. Please use the
          <a
            href={getHref()}
            className="mx-1 text-blue-400"
            target="_blank"
            rel="noreferrer"
          >
            official undergraduate advising manual
          </a>
          and the{' '}
          <a
            href="https://sis.jhu.edu/sswf/"
            className="text-blue-400"
            target="_blank"
            rel="noreferrer"
          >
            SIS degree audit
          </a>{' '}
          to double check that your degree is being correctly tracked. Please
          report any issues in the feedback form.
        </div>
      )}
      <CourseBar
        distribution={{
          name: 'Total Credits',
          expr: '',
          required_credits: major !== null ? major.total_degree_credit : 0,
          fulfilled_credits: totalCredits,
          description:
            major !== null
              ? 'This is the total amount of credits that is required for ' +
                major.degree_name
              : '',
        }}
        completed={
          totalCredits >= (major !== null ? major.total_degree_credit : 0)
        }
        general={true}
        bgcolor=""
      />{' '}
      {distributionBarsJSX}
      {/* M notes: distributionsBarsJSX is where the bars except total credits are created  */}
      {reviewMode !== ReviewMode.View && <Reviewers />}
    </div>
  );
};

export default Distributions;
