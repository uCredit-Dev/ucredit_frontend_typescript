import clsx from 'clsx';
import { useState, useEffect, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectSemester,
  selectYear,
  updateSearchStack,
  selectVersion,
  selectInspectedCourse,
} from '../../../../slices/searchSlice';
import {
  filterNNegatives,
  processPrereqs,
  checkPrereq,
} from '../../../../resources/assets';
import PrereqDropdown from './PrereqDropdown';
import {
  selectCurrentPlanCourses,
  selectPlan,
} from '../../../../slices/currentPlanSlice';
import { selectCourseCache } from '../../../../slices/userSlice';
import { selectCourseToShow } from '../../../../slices/popupSlice';
import {
  SISRetrievedCourse,
  UserCourse,
  Year,
} from '../../../../resources/commonTypes';

// Parsed prereq type
// satisfied: a boolean that tells whether the prereq should be marked with green (satisfied) or red (unsatisfied)
// jsx: the dropdown bullet containing the current prereq course pill as well as its subsequent prereqs.
type parsedPrereqs = {
  satisfied: boolean;
  jsx: JSX.Element;
};

/**
 * This is the bullet-list display of the prereqs for each course.
 */
const PrereqDisplay: FC = () => {
  // Redux Setup
  const dispatch = useDispatch();
  const version = useSelector(selectVersion);
  const inspected = useSelector(selectInspectedCourse);
  const currPlanCourses = useSelector(selectCurrentPlanCourses);
  const semester = useSelector(selectSemester);
  const year = useSelector(selectYear);
  const currentPlan = useSelector(selectPlan);
  const courseCache = useSelector(selectCourseCache);
  const courseToShow = useSelector(selectCourseToShow);

  // Component states
  const [prereqDisplayMode, setPrereqDisplayMode] = useState(2);
  const [preReqDisplay, setPreReqDisplay] = useState<JSX.Element[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [hasPreReqs, setHasPreReqs] = useState<boolean>(false);
  const [NNegativePreReqs, setNNegativePreReqs] = useState<any[]>();

  // This useEffect performs prereq retrieval every time a new course is displayed.
  useEffect(() => {
    // Reset state whenever new inspected course
    setPreReqDisplay([]);
    setLoaded(false);
    setHasPreReqs(false);

    // First get all valid preReqs (isNegative = true)
    let preReqs = filterNNegatives(version);
    setNNegativePreReqs(preReqs);
    // If there exists preReqs, we need to process and display them.
    if (version !== 'None' && preReqs.length > 0) {
      setHasPreReqs(true);
      display(preReqs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version, courseCache]);

  /**
   * Processes then displays prereqs.
   * @param preReqs an array of prereqs
   */
  const display = (preReqs: any[]): void => {
    processPrereqs(preReqs, courseCache, currPlanCourses).then((resolved) => {
      afterGathering(resolved.numNameList, resolved.numList, resolved.expr);
    });
  };

  /**
   * This is that one open expression calculator leetcode problem.
   * We're basically modifying it and adapting it to parse through prereqs
   * Input param is the prereq expression to parse (ie. AS.110.202 AND (EN.550.310 OR EN.553.211 OR EN.553.310 OR EN.553.311 OR ((EN.550.420 OR EN.553.420) AND (EN.550.430 OR EN.553.430 OR EN.553.431)) OR EN.560.348) AND (AS.110.201 OR AS.110.212 OR EN.553.291) AND (EN.500.112 OR EN.500.113 OR EN.500.114 OR (EN.601.220 OR EN.600.120) OR AS.250.205 OR EN.580.200 OR (EN.600.107 OR EN.601.107)))
   * Output is an array of prereqs, which could be a single course number, an array of course numbers, or the word "OR". Any course not seperated by an "OR" is another prereq to fullfill.
   * This output can then be redisplayed as a nice bullet list.
   * @param input - prereq array
   * @returns an parsed array of prereqs
   */
  const createPrereqBulletList = (input: string[]): any[] => {
    let courseArr: any[] = [];
    let skipCount = 0;
    for (let i = 0; i < input.length; i++) {
      if (skipCount <= 0) {
        if (input[i] === 'AND') {
          // skip
        } else if (input[i] === '(') {
          [skipCount, courseArr] = handleOpenParenthesis(input, i, courseArr);
        } else {
          courseArr.push(input[i]);
        }
      } else skipCount--;
    }
    return courseArr;
  };

  // Helper method handling the open parenthesis case when creating the prereq bullet list
  const handleOpenParenthesis = (
    input: string[],
    i: number,
    courseArr: any[],
  ): any[] => {
    // Adds in everything between this level's open and close parentheses
    // Keeps track of whether we have closed the original open parentheses
    const parenthesesStack = [input[i]];
    const subCourseArr: string[] = [];
    let skipCount: number = 0;
    while (parenthesesStack.length > 0) {
      skipCount++;
      if (input[i + skipCount] === ')') {
        // If close, pop one from parentheses stack
        parenthesesStack.pop();
      } else if (input[i + skipCount] === '(') {
        // if open, push open parentheses in
        parenthesesStack.push('(');
      }
      // If we're still in original parentheses, push it into sthe subArray
      if (parenthesesStack.length > 0) {
        subCourseArr.push(input[i + skipCount]);
      }
    }

    // Recursively calls function on string inside of parentheses.
    return [skipCount, [...courseArr, createPrereqBulletList(subCourseArr)]];
  };

  /**
   * Function currying to produce a function that would update the store when clicking on prereqs
   * @param courseNumber - course number you are updating inspected course to
   * @returns an function that caches and updates search stack when called
   */
  const updateInspected =
    (courseNumber: string): (() => void) =>
    (): void => {
      courseCache.forEach((course: SISRetrievedCourse) => {
        if (
          course.number === courseNumber &&
          inspected !== 'None' &&
          version !== 'None'
        ) {
          dispatch(
            updateSearchStack({
              new: course,
              oldSIS: inspected,
              oldV: version,
            }),
          );
        }
      });
    };

  /**
   * Outputs the prereqs as components
   * @param inputs - parsed prereq array
   * @returns an array of jsx elements based on parsed prereqs
   */
  const preReqsToComponents = (inputs: any): JSX.Element[] => {
    let out: any[] = [];
    const orParsed = parsePrereqsOr(inputs, 0);
    const parsed: parsedPrereqs = getNonStringPrereq(orParsed);
    out.push(parsed.jsx);
    return out;
  };

  /**
   * Parses through the currentPlan years and returns year object corresponding to the year of the prereq or the current year if not found
   * @param toShow - course to find year of
   *  @returns year object
   */
  const getYearById = (toShow: UserCourse | null): Year => {
    const yearToGet: string = toShow ? toShow.year_id : year;
    for (const yearObj of currentPlan.years) {
      if (yearObj._id === yearToGet) {
        return yearObj;
      }
    }
    return currentPlan.years[currentPlan.years.length - 1];
  };

  /**
   * Parses arrays into clickable prereq number links
   * @param input - prereq array
   * @returns an array of parsed prereqs
   */
  const getNonStringPrereq = (input: any): parsedPrereqs => {
    const element = input;
    if (typeof element === 'string') {
      // If the element is a number
      const noCBrackets: string = element.substr(0, element.length - 3);
      const noCBracketsNum: string = element.substr(0, 10);
      const yearToCheck: Year = getYearById(courseToShow);
      const semesterToCheck: string =
        courseToShow !== null
          ? courseToShow.term.charAt(0).toUpperCase() +
            courseToShow.term.slice(1)
          : semester;
      let satisfied: boolean = checkPrereq(
        currPlanCourses,
        currentPlan,
        noCBracketsNum,
        yearToCheck,
        semesterToCheck === 'Fall' ||
          semesterToCheck === 'Spring' ||
          semesterToCheck === 'Summer' ||
          semesterToCheck === 'Intersession'
          ? semesterToCheck
          : semester,
      );
      return {
        satisfied: satisfied,
        jsx: (
          <p
            className="w-full"
            key={noCBracketsNum + semester + yearToCheck._id}
          >
            <button
              className={clsx(
                'flex flex-wrap mb-1 max-w-md text-left text-sm font-medium focus:outline-none',
              )}
              onClick={() => updateInspected(noCBracketsNum)()}
            >
              <div className="flex flex-row w-auto h-auto transition duration-100 ease-in group">
                {satisfied && (
                  <img
                    src="svg/CheckMark.svg"
                    alt=""
                    className={clsx('mr-1 w-5 h-5', {
                      'text-green-700 group-hover:text-red-900': !satisfied,
                      'text-green-700 group-hover:text-green-900': satisfied,
                    })}
                  />
                )}
                <div
                  className={clsx(
                    'border-b border-solid border-gray-300 transition duration-100 ease-in',
                    {
                      'text-green-700 hover:text-green-900 hover:border-green-900':
                        satisfied,
                      'hover:text-red-900 text-red-700 hover:border-red-900':
                        !satisfied,
                    },
                  )}
                >
                  {noCBrackets}
                </div>
              </div>
            </button>
          </p>
        ),
      };
    } else if (typeof element[0] === 'number') {
      // If the element is a OR sequence (denoted by the depth number in the first index)
      const parsedSat: boolean = isSatisfied(element, true);
      return {
        satisfied: parsedSat,
        jsx: (
          <div key={element + parsedSat}>
            <PrereqDropdown
              satisfied={parsedSat}
              text={'Any one course below'}
              element={element}
              getNonStringPrereq={getNonStringPrereq}
              or={true}
            />
          </div>
        ),
      };
    } else if (typeof element === 'object') {
      // If the element is a parentheses sequence
      if (element.length === 1) {
        const parsed: parsedPrereqs = getNonStringPrereq(element[0]);
        return {
          satisfied: parsed.satisfied,
          jsx: <p key={'drop' + element}>{parsed.jsx}</p>,
        };
      } else {
        const parsedSat: boolean = isSatisfied(element, false);
        return {
          satisfied: parsedSat,
          jsx: (
            <div key={'drop' + element}>
              <PrereqDropdown
                satisfied={parsedSat}
                text={'All courses below'}
                element={element}
                getNonStringPrereq={getNonStringPrereq}
                or={false}
              />
            </div>
          ),
        };
      }
    } else {
      return {
        satisfied: true,
        jsx: <></>,
      };
    }
  };

  /**
   * Determines whether a certain prereq branch/leaf is satisfied
   * @prop element - an array of prereqs
   * @prop or - whether the prereq relationship is an OR or AND situation
   * @return true if satisfied false if not
   */
  const isSatisfied = (element: [], or: boolean): boolean => {
    let orAndSatisfied = false;

    element.forEach((el: any, index) => {
      if (typeof el !== 'number') {
        const parsed: {
          satisfied: boolean;
          jsx: JSX.Element;
        } = getNonStringPrereq(el);

        // If it's not an or statement, the first course must be satisfied.
        if (index === 0) {
          orAndSatisfied = parsed.satisfied;
        }

        // If it's an or statement, only one course would need to be satisfied. Otherwise, every course would need to be satisfied.
        if (or && parsed.satisfied) {
          orAndSatisfied = true;
        } else if (!or && !parsed.satisfied) {
          orAndSatisfied = false;
        }
      }
    });
    return orAndSatisfied;
  };

  /**
   * Takes parsed prereq array and then parses this array again to make OR sequences
   * @param input - an array of prereqs
   * @param depth - how deep into the prereq branch you are
   * @returns a parsed version of the prereqs
   */
  const parsePrereqsOr = (input: any, depth: number): any[] => {
    let orParsed: any[] = [];
    let skip = false;

    // Group by ORs: Put elements connected by ORs as arrays starting with depth number (as an identifier). All other elements are treated as ands.
    // if OR, pop last element from orParsed. If it's a string, make a new array. If array, push the next element into this array. Put the array back into orParsed.
    // if not OR, push element into orParsed
    for (let i = 0; i < input.length; i++) {
      if (!skip) {
        [skip, orParsed] = handleParsePrereqLoop(orParsed, input, i, depth);
      } else skip = false;
    }
    return orParsed;
  };

  const handleParsePrereqLoop = (
    orParsed: any[],
    input: any,
    i: number,
    depth: number,
  ): any[] => {
    let skipOne: boolean = false;
    if (input[i] === 'OR') {
      let el = orParsed.pop();
      let toAdd;
      // If the course or array of courses after the OR is a string, it must be a course number. Otherwise, it's a course array.
      if (typeof input[i + 1] === 'string') {
        toAdd = input[i + 1];
      } else {
        toAdd = parsePrereqsOr(input[i + 1], depth);
      }

      // First element
      if (el === null) {
        orParsed.push(0);
        orParsed.push(toAdd);
      } else if (typeof el === 'object' && typeof el[0] === 'number') {
        // If past element was an array and we are in an or chain
        // The last element was an or sequence
        el.push(toAdd);
        orParsed.push(el);
      } else if (typeof el === 'object' && typeof el[0] !== 'number') {
        // The last element was a parentheses sequence
        // We need to parse the sequence and put that element back into our array
        el = parsePrereqsOr(input[i], depth);
        orParsed.push([el, toAdd]);
      } else {
        // Last element wasn't any type of sequence. Thus, a new OR sequence is made and pushed in.
        const orArray = [depth, el, toAdd];
        orParsed.push(orArray);
      }
      skipOne = true;
    } else if (typeof input[i] === 'string') {
      // If number, just push in
      orParsed.push(input[i]);
    } else {
      // If not OR or a course number, must be a parentheses sequence. We will recursively call this function in this case.
      orParsed.push(...parsePrereqsOr(input[i], depth));
    }
    return [skipOne, [...orParsed]];
  };

  // Check if it's time to update the prereq section with components.
  const afterGathering = (
    numNameList: string[],
    numList: string[],
    expr: any,
  ) => {
    for (let i = 0; i < numList.length; i++) {
      expr = expr.replaceAll(
        numList[i],
        numNameList[i].substr(0, 10) +
          numNameList[i].substr(20, numNameList[i].length),
      );
    }
    expr = expr.split('^');
    const list = createPrereqBulletList(expr);
    setPreReqDisplay(preReqsToComponents(list));
    setLoaded(true);
  };

  /**
   * Toggles between prereq display mode.
   * @param mode - display mode
   * @returns a function reference for display mode handlerer
   */
  const handlePrereqDisplayModeChange = (mode: number) => () => {
    setPrereqDisplayMode(mode);
  };

  // Gets the correct prereq display UI
  const getPrereqDisplay = (): JSX.Element => {
    if (prereqDisplayMode === 1)
      return (
        <>
          {NNegativePreReqs !== undefined && NNegativePreReqs.length > 0 ? (
            <div className="font-normal">{NNegativePreReqs[0].Description}</div>
          ) : (
            <div>Loading description...</div>
          )}
        </>
      );
    else if (!loaded)
      return <>{'Loading Prereqs Status: loaded is ' + loaded.toString()}</>;
    else
      return (
        <p key={'drop' + preReqDisplay} className="p-2 overflow-y-auto">
          {preReqDisplay}
        </p>
      );
  };

  return (
    <>
      <div className="flex flex-row mt-2">
        <div
          className={clsx(
            'flex flex-row items-center justify-center mr-1 p-1 w-7 h-7 rounded cursor-pointer transform hover:scale-110 transition duration-200 ease-in',
            {
              'bg-gray-200': prereqDisplayMode !== 1,
              'hover:bg-gray-200 transition duration-100 ease-in':
                prereqDisplayMode === 1,
            },
          )}
          onClick={handlePrereqDisplayModeChange(2)}
          data-tip="bullet list"
          data-for="godTip"
        >
          <img src="svg/Menu.svg" alt="" />
        </div>
        <div
          className={clsx(
            'flex flex-row items-center justify-center p-1 w-7 h-7 rounded cursor-pointer transform hover:scale-110 transition duration-200 ease-in',
            {
              'bg-gray-200': prereqDisplayMode === 1,
              'hover:bg-gray-200 transition duration-100 ease-in':
                prereqDisplayMode !== 1,
            },
          )}
          onClick={handlePrereqDisplayModeChange(1)}
          data-tip="description"
          data-for="godTip"
        >
          <img src="svg/Description.svg" alt="" className="w-5 h-5" />
        </div>
      </div>

      {!hasPreReqs ? (
        // <div className="font-normal">No Prereqs!</div>
        <div className="flex flex-col items-center justify-center w-full h-full font-normal">
          No Prerequisites!
        </div>
      ) : (
        getPrereqDisplay()
      )}
    </>
  );
};

export default PrereqDisplay;
