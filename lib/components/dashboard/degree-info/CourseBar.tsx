import clsx from 'clsx';
import React, { useState, useEffect, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCurrentPlanCourses,
  selectDistributions,
  updateSelectedDistribution,
  updateSelectedFineReq,
} from '../../../slices/currentPlanSlice';
import { CheckCircleIcon, ExclamationIcon } from '@heroicons/react/solid';
import {
  updateAddingPrereq,
  updateInfoPopup,
  updateShowingCart,
} from '../../../slices/popupSlice';
import { clearSearch, updatePlaceholder } from '../../../slices/searchSlice';
import {
  selectToken,
  updateCartInvokedBySemester,
} from '../../../slices/userSlice';
import Comments from '../Comments';
import { ReviewMode, UserDistribution } from '../../../resources/commonTypes';
import { getDistribution } from '../../../resources/assets';

/**
 * A distribution bar.
 * @prop distribution - the distribution the bar refers to
 * @prop general - if this is a general distribution
 * @prop description - this is the description of the distribution
 * @prop total - whether this is a course bar tracking the total amount of credits
 * M tried @prop bgcolor - color of this distribution
 */
const CourseBar: FC<{
  distribution: UserDistribution | any;
  general: boolean;
  bgcolor: string;
  mode?: ReviewMode;
}> = ({ distribution, general, bgcolor, mode }) => {
  const [plannedCredits, setPlannedCredits] = useState(distribution.planned);
  const [hovered, setHovered] = useState(false);

  const token = useSelector(selectToken);
  const currPlanCourses = useSelector(selectCurrentPlanCourses);
  const maxCredits = distribution.required_credits;
  const section = distribution.name;
  const distributions = useSelector(selectDistributions);

  const dispatch = useDispatch();

  const remainingCredits =
    plannedCredits <= maxCredits ? maxCredits - plannedCredits : 0;

  // Decides how filled the credit bar is.
  useEffect(() => {
    let temp = distribution.planned;
    setPlannedCredits(temp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currPlanCourses, distribution, distributions]);

  // Onclick for course bar, opens cart popup passing in corresponding props
  const openCartPopup = async () => {
    dispatch(updateCartInvokedBySemester(false));
    // Filter for the correst distributions from redux store
    let distr: UserDistribution = distribution;
    // get fineReqs
    if (distribution._id) {
      distr = await getDistribution(distribution._id, token);
    }
    if (distr) {
      // if the distribution exists, then update the cart
      // at this point we have access to the current requirement
      // and all dsitibrutions. to pick out hte rest of the ascoatied fine distirbutions, use this filter.
      dispatch(updateSelectedDistribution(distr));
      dispatch(updateSelectedFineReq(null));
      dispatch(updateShowingCart(true));
      dispatch(updateInfoPopup(false));
      dispatch(updateAddingPrereq(false));

      // closes the search popup (if its showing)
      dispatch(clearSearch());
      dispatch(updatePlaceholder(false));
    }
  };

  const tooltip =
    `<div style="overflow: wrap; margin-bottom: 1rem;">${section}</div>` +
    `<div style="margin-bottom: 1rem;">${distribution.description}</div>` +
    `<div style='width: 100%; height: auto;'><div style='width: 100%; display: flex; flex-direction: row; justify-content: space-between;'>` +
    `<div>Planned</div><div>${plannedCredits}</div>
    </div>
    <div style='display: flex; flex-direction: row; justify-content: space-between;'>` +
    (remainingCredits !== 0
      ? `<div>Remaining</div><div>${remainingCredits}</div>`
      : (() =>
          distribution.satisfied
            ? `<div style="width: 100%; height: auto; display: flex; flex-direction: row; justify-content: center">Completed!</div>`
            : `<div style="width: 100%; height: auto; display: flex; flex-direction: row; justify-content: center">Your credits fulfill this overall requirement, but your fine requirements are lacking! Please click this bar to find out more.</div>`)()) +
    `</div>`;

  return (
    <>
      <div
        className={clsx(
          'z-0 flex flex-row text mb-1 rounded-lg whitespace-nowrap overflow-hidden overflow-ellipsis items-center w-full',
          {
            'font-bold': general,
          },
        )}
        key={section}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Comments
          location={'Distribution ' + distribution.name.replace(/\s/g, '')}
          hovered={hovered}
          left={true}
          mode={mode ? mode : ReviewMode.None}
        />
        <div className="truncate">{section}</div>
        <div>
          {remainingCredits === 0 && distribution.satisfied ? (
            <CheckCircleIcon className="w-4 h-5 mt-1 ml-1 stroke-2" />
          ) : remainingCredits === 0 ? (
            <ExclamationIcon className="w-4 h-5 mt-1 ml-1 stroke-2" />
          ) : null}
        </div>
      </div>

      <div
        id={distribution.name}
        className="relative flex flex-row w-full h-6 cursor-pointer"
        onClick={openCartPopup}
      >
        <div
          className="relative flex flex-row w-full h-6 mb-2 bg-gray-200 rounded-full"
          data-tooltip-html={tooltip}
          data-tooltip-id="godtip"
        >
          <div
            className="h-full rounded-full"
            style={{
              background: bgcolor.length > 0 ? bgcolor : '#90EE90',
              width: `${
                plannedCredits <= maxCredits
                  ? (plannedCredits / maxCredits) * 100 + '%'
                  : '100%'
              }`,
            }}
          />
          {/* {remainingCredits === 0 && completed ? (
            <CheckCircleIcon className="absolute w-5 h-5 text-white transform -translate-x-1/2 -translate-y-1/2 stroke-2 left-1/2 top-1/2" />
          ) : (
            (() => (
              <>
                {remainingCredits === 0 && !completed
                  ? (() => (
                      <>
                        {!completed ? (
                          <ExclamationIcon className="absolute w-5 h-5 transform -translate-x-1/2 -translate-y-1/2 stroke-2 left-1/2 top-1/2 stroke-white" />
                        ) : null}
                      </>
                    ))()
                  : null}
              </>
            ))()
          )} */}
          <div className="absolute font-semibold -translate-x-1/2 left-1/2">
            {plannedCredits + '/' + maxCredits}
          </div>
          {/* <div className="absolute font-thin right-2">
            {maxCredits > plannedCredits ? maxCredits - plannedCredits : null}
          </div> */}
        </div>
      </div>
    </>
  );
};

export default CourseBar;
