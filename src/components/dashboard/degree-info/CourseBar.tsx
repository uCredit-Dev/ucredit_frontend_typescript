import clsx from 'clsx';
import { useState, useEffect, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCurrentPlanCourses,
  selectDistributions,
} from '../../../slices/currentPlanSlice';
import { requirements } from './distributionFunctions';
import { ReactComponent as CheckSvg } from '../../../resources/svg/Check.svg';
import DistributionPopup from './DistributionPopup';
import ReactTooltip from 'react-tooltip';
import { updateSelectedDistribution, updateShowingCart } from '../../../slices/popupSlice';
import { clearSearch, updatePlaceholder } from '../../../slices/searchSlice';

/**
 * A distribution bar.
 * @prop distribution - the distribution the bar refers to
 * @prop general - if this is a general distribution
 * @prop description - this is the description of the distribution
 * @prop total - whether this is a course bar tracking the total amount of credits
 */
const CourseBar: FC<{
  distribution: requirements;
  general: boolean;
}> = ({ distribution, general }) => {
  const [displayAdd, setDisplayAdd] = useState(false);
  const [flipped, setFlipped] = useState<string[]>([]);
  const [plannedCredits, setPlannedCredits] = useState(
    distribution.fulfilled_credits,
  );

  const currPlanCourses = useSelector(selectCurrentPlanCourses);
  const maxCredits = distribution.required_credits;
  const section = distribution.name;
  const distributions = useSelector(selectDistributions);

  const dispatch = useDispatch();

  const remainingCredits =
    plannedCredits <= maxCredits ? maxCredits - plannedCredits : 0;

  // Decides how filled the credit bar is.
  useEffect(() => {
    let temp = distribution.fulfilled_credits;
    setPlannedCredits(temp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currPlanCourses,
    flipped,
    distribution.fulfilled_credits,
    distribution,
    distributions,
  ]);

  // Onclick for course bar, opens cart popup passing in corresponding props
  const openCartPopup = () => {
    // Filter for the correst distributions from redux store
    let distrs = distributions.filter(req => req[0] === distribution.name)[0];
    if (distrs) { // if the distribution exists, then update the cart
      // at this point we have access to the current requirement
      // and all dsitibrutions. to pick out hte rest of the ascoatied fine distirbutions, use this filter.
      // TODO : investigate if fine reqs are available at this level already?
      dispatch(updateSelectedDistribution(distrs));
      dispatch(updateShowingCart(true));
      
      // closes the search popup (if its showing)
      dispatch(clearSearch());
      dispatch(updatePlaceholder(false));
    }
  }

  const tooltip =
    `<div style="overflow: wrap; margin-bottom: 1rem;">${section}</div>` +
    `<div style="margin-bottom: 1rem;">${distribution.description}</div>` +
    `<div style='width: 90px; height: auto;'><div style='width: 100%; display: flex; flex-direction: row; justify-content: space-between;'>` +
    `<div>Planned</div><div>${plannedCredits}</div>
    </div>
    <div style='display: flex; flex-direction: row; justify-content: space-between;'>` +
    (remainingCredits !== 0
      ? `<div>Remaining</div><div>${remainingCredits}</div>`
      : `<div style="width: 100%; height: auto; display: flex; flex-direction: row; justify-content: center">Completed!</div>`) +
    `</div>`;

  const closePopup = () => {
    setDisplayAdd(false);
  };

  const onSave = (s: string[]) => {
    setFlipped(s);
  };

  return (
    <>
      {displayAdd ? (
        <DistributionPopup
          distribution={distribution}
          cleanup={closePopup}
          save={onSave}
          flipped={flipped.slice()}
        />
      ) : null}
      <div
        className={clsx(
          'text mb-1 whitespace-nowrap overflow-hidden overflow-ellipsis',
          {
            'font-bold': general,
          },
        )}
        key={section}
      >
        {section}
      </div>
      <div
        className="relative flex flex-row w-full h-6 bg-gray-200 rounded transform hover:scale-101 transition duration-200 ease-in"
        data-tip={tooltip}
        data-for="godTip"
        onMouseOver={() => {
          ReactTooltip.rebuild();
        }}
        onClick={openCartPopup}
      >
        <div
          className="relative flex flex-row mb-2 w-full h-6 bg-gray-200 rounded transform hover:scale-105 cursor-pointer transition duration-200 ease-in"
          data-tip={tooltip}
          data-for="godTip"
        >
          <div
            className="h-full bg-blue-300 rounded"
            style={{
              width: `${plannedCredits <= maxCredits
                ? (plannedCredits / maxCredits) * 100 + '%'
                : '100%'
                }`,
            }}
          />
          {remainingCredits === 0 ? (
            <CheckSvg className="absolute left-1/2 top-1/2 w-5 h-5 text-white stroke-2 transform -translate-x-1/2 -translate-y-1/2" />
          ) : null}
        </div>
        {/* <Add
          className="h-6 transform hover:scale-150 transition duration-200 ease-in"
          onClick={addToDistribution}
        /> */}
      </div>
    </>
  );
};

export default CourseBar;
