import { QuestionMarkCircleIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import React, { useState, useRef, useEffect, FC } from 'react';
import { useSelector } from 'react-redux';
import { getColors } from '../../../../resources/assets';
import { selectVersion } from '../../../../slices/searchSlice';
import PrereqDisplay from '../prereqs/PrereqDisplay';
import CourseEvalSection from './CourseEvalSection';
import PostReqSection from '../postreqs/PostReqSection';

/**
 * A component showing the specific version of the course at a particular semester/year
 * @prop props - setInspected area is a function that sets the area to add this prospective course to.
 */
const CourseVersion: FC<{ setInspectedArea: (area: string) => void }> = ({
  setInspectedArea,
}) => {
  // Redux Setup
  const version = useSelector(selectVersion);

  // component state setup
  const bioElRef = useRef<HTMLParagraphElement>(null);
  const [showMore, setShowMore] = useState<number>(2);
  const [displayPreReqsView, setdisplayPreReqsView] = useState<number>(1);

  // UseEffect runs when a new course is version.
  // It automatically updates the current area in the add course area selection to the first area in the course areas string.
  useEffect(() => {
    // Reset displayView for prereqs
    setdisplayPreReqsView(1);
    setShowMore(2);
    if (
      version !== 'None' &&
      version.areas !== 'None' &&
      version.areas !== undefined
    ) {
      const firstArea = version.areas.charAt(0);
      if (
        firstArea === 'N' ||
        firstArea === 'S' ||
        firstArea === 'H' ||
        firstArea === 'Q' ||
        firstArea === 'E'
      ) {
        setInspectedArea(firstArea);
      }
    } else {
      setInspectedArea('None');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version]);

  // Everytime the inspected course changes or someone presses show more, update description height.
  useEffect(() => {
    let hasOverflowingChildren = false;
    if (bioElRef.current !== null) {
      const bioEl: HTMLParagraphElement = bioElRef.current;
      hasOverflowingChildren =
        bioEl.offsetHeight < bioEl.scrollHeight ||
        bioEl.offsetWidth < bioEl.scrollWidth;
    }
    if (hasOverflowingChildren && showMore === 2) {
      setShowMore(0);
    }
  }, [showMore, bioElRef, version]);

  /**
   * Gets course restrictions
   * @returns an array of restribtions if found, otherwise returns "No Restribtions!"
   */
  const getRestrictions = (): string[] | string | undefined => {
    if (version !== 'None') {
      const restrictions = version.restrictions.map(
        (restriction) => restriction.RestrictionName,
      );
      if (restrictions.length !== 0) {
        return restrictions;
      } else {
        return 'No Restrictions!';
      }
    }
  };

  /**
   * Gets name of passed areas.
   * @param area - area to get name for
   * @returns name for area
   */
  const getAreaName = (area: string): string => {
    if (area === 'N') {
      return 'Natural Sciences';
    } else if (area === 'E') {
      return 'Engineering';
    } else if (area === 'S') {
      return 'Social Sciences';
    } else if (area === 'H') {
      return 'Humanities';
    } else if (area === 'Q') {
      return 'Quantitative';
    } else {
      return 'None';
    }
  };

  const getAreaEls = () => {
    if (version !== 'None' && version.areas !== 'None')
      return version.areas.split('').map((area: string, i: number) => (
        <div
          className="flex flex-row items-center transition duration-200 ease-in transform hover:scale-110"
          key={area + version.number + i + version.term}
        >
          <div
            className="flex items-center w-auto px-1 font-semibold rounded select-none"
            style={{ backgroundColor: getColors(area, version.wi) }}
            data-tooltip-content={getAreaName(area)}
            data-tooltip-id="godtip"
          >
            {area}
          </div>
        </div>
      ));
    else if (version !== 'None')
      return (
        <div
          className="flex items-center w-auto px-1 font-semibold rounded select-none"
          style={{ backgroundColor: getColors(version.areas, version.wi) }}
          key={'noneVersion' + version.term}
        >
          None
        </div>
      );
    else return null;
  };

  const getTagEls = () => {
    if (version !== 'None') {
      if (version.tags.length === 0)
        return <div className="select-none">No tags!</div>;
      else
        return version.tags.map((tag, i) => (
          <div
            key={'' + tag + version.number + i + version.term}
            className="px-1 mx-1 mt-1 font-semibold text-white transition duration-200 ease-in transform rounded w-max bg-primary hover:scale-101"
          >
            <div
              data-tooltip-content={
                'Ask your advisor for more info about ' + tag + ' tag!'
              }
              data-tooltip-id="godtip"
            >
              {tag}
            </div>
          </div>
        ));
    } else {
      return null;
    }
  };

  const getShowMoreText = () => {
    if (showMore === 0)
      return (
        <button
          className="underline transform focus:outline-none"
          onClick={() => {
            setShowMore(1);
          }}
        >
          Show more...
        </button>
      );
    else if (showMore === 1)
      return (
        <button
          className="underline transform focus:outline-none"
          onClick={() => {
            setShowMore(0);
          }}
        >
          Show less...
        </button>
      );
    else return null;
  };

  const getPrereqDisplayMode = () => {
    if (displayPreReqsView === 1) {
      return <PrereqDisplay />;
    } else if (displayPreReqsView === 2) {
      return <PostReqSection />;
    } else {
      return <CourseEvalSection />;
    }
  };

  const getWIText = () => (version !== 'None' && version.wi ? 'Yes' : 'No');

  return (
    <>
      {version !== 'None' && (
        <>
          <div className="grid w-auto h-auto grid-cols-2 tight:flex tight:flex-col">
            <div className="w-auto h-auto">
              <div className="flex flex-row items-center">
                <div className="mr-1 font-semibold">Number: </div>
                {version.number}
              </div>
            </div>
            <div className="w-auto h-auto">
              <div className="flex flex-row items-center">
                <div className="mr-1 font-semibold">Credit: </div>
                <div
                  className="flex items-center w-auto px-1 font-semibold text-white transition duration-200 ease-in transform rounded select-none bg-primary hover:scale-110"
                  data-tooltip-content={version.credits + ' credits'}
                  data-tooltip-id="godtip"
                >
                  {version.credits}
                </div>
              </div>
            </div>
            <div className="w-auto h-auto">
              <div className="flex flex-row items-center">
                <div className="flex flex-row mr-1 font-semibold">
                  Areas
                  <div className="flex-grow mt-1">
                    <QuestionMarkCircleIcon
                      className="h-4 fill-gray"
                      data-tooltip-id="godtip"
                      data-tooltip-html={
                        '<p>Areas designate the specific subset a course belongs to. Each degree requires students to take a certain amount of credits or courses in a spcific area.</p><p>H - Humanities</p><p>S - Social Sciences</p><p>E - Engineering</p><p>N - Natural Sciences</p><p>Q - Quantitative</p>'
                      }
                    />
                  </div>
                  :
                </div>
                {getAreaEls()}
              </div>
              <div>
                <span className="font-semibold">Department: </span>
                {version.department}
              </div>
              <div className="flex flex-row w-full h-auto">
                <span className="flex flex-row font-semibold">
                  Tags
                  <div className="flex-grow mt-1">
                    <QuestionMarkCircleIcon
                      className="h-4 fill-gray"
                      data-tooltip-id="godtip"
                      data-tooltip-html={
                        '<p>Many degree and a few courses require students to complete a specific amount of courses under a certain tag.</p><p>These usually come in the form of 3-4 letters designating department (ie. CSC = Computer Science) followed by 2+ letters signalling the specific subgroup designation within the department (ie. SOFT = Software).</p>'
                      }
                    />
                  </div>
                  :{' '}
                </span>
                <div className="flex flex-row flex-wrap ml-1">
                  {getTagEls()}
                </div>
              </div>
            </div>
            <div className="w-auto h-auto">
              <div>
                <span className="font-semibold">Restrictions: </span>
                {getRestrictions()}
              </div>
              <div className="w-auto h-auto">
                <div>
                  <span className="font-semibold">Level: </span>
                  {version.level}
                </div>
              </div>
              <div className="w-auto h-auto">
                <div>
                  <span className="font-semibold">Writing Intensive: </span>
                  {getWIText()}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 mb-3">
            <p
              className="overflow-y-hidden font-normal"
              style={{ maxHeight: showMore === 1 ? '100%' : '6rem' }}
              ref={bioElRef}
            >
              {version.bio}
            </p>
            {getShowMoreText()}
          </div>
          <div className="flex flex-row border-b-2 relative">
            {displayPreReqsView === 2 ? (
              <div className="absolute top-0 right-0">
                <div
                  className="flex justify-center items-center w-7 h-7 text-sm font-semibold text-black transition duration-200 ease-in transform rounded-full bg-gray-200 hover:scale-110"
                  data-tooltip-content={`Green: Satisfied all prerequisites. Red: Not all prerequisites satisfied.`}
                  data-tooltip-id="godtip"
                >
                  ?
                </div>
              </div>
            ) : (
              <></>
            )}
            <button
              className={clsx(
                'mr-3 text-xl font-medium hover:border-b-2 border-secondary focus:outline-none',
                {
                  'border-b-2 -mb-0.5': displayPreReqsView === 1,
                  'hover:-mb-0.5': displayPreReqsView !== 1,
                },
              )}
              onClick={() => {
                setdisplayPreReqsView(1);
              }}
            >
              Prerequisites
            </button>
            <button
              className={clsx(
                'mr-3 text-xl font-medium hover:border-b-2 border-secondary focus:outline-none',
                {
                  'border-b-2 -mb-0.5': displayPreReqsView === 0,
                  'hover:-mb-0.5': displayPreReqsView !== 0,
                },
              )}
              onClick={() => {
                setdisplayPreReqsView(0);
              }}
            >
              Course Evaluation
            </button>{' '}
            <button
              data-tooltip-content={
                'Postrequisites are courses that require the current course as a prerequisite.'
              }
              data-tooltip-id="godtip"
              className={clsx(
                'mr-3 text-xl font-medium hover:border-b-2 border-secondary focus:outline-none',
                {
                  'border-b-2 -mb-0.5': displayPreReqsView === 2,
                  'hover:-mb-0.5': displayPreReqsView !== 2,
                },
              )}
              onClick={() => {
                setdisplayPreReqsView(2);
              }}
            >
              Postrequisites
            </button>
          </div>
          {getPrereqDisplayMode()}
        </>
      )}
    </>
  );
};

export default CourseVersion;
