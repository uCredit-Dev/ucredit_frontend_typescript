import { FC, useEffect, useState } from 'react';
import clsx from 'clsx';

/**
 * This is one of the open-close prereq dropdowns.
 * @prop text - the raw text of the dropdown
 * @prop satisfied - whether the dropdown is satisfied
 * @prop element - the parsed version of the raw text
 * @prop getNonStringPrereq - function called to get a parsed prereq object
 * @prop or - whether this dropdown is an or or and dropdown.
 */
const PrereqDropdown: FC<{
  text: string;
  satisfied: boolean;
  element: string[];
  getNonStringPrereq: (element: any) => {
    satisfied: boolean;
    jsx: JSX.Element;
  };
  or: boolean;
}> = ({ text, satisfied, element, getNonStringPrereq, or }) => {
  const [open, setOpen] = useState<boolean>(true);
  const [rootHovered, setRootHovered] = useState<boolean>(false);

  useEffect(() => {
    if (satisfied) {
      setOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Gets child branches and leaves of prereq
   */
  const getChildPrereqs = () => {
    // eslint-disable-next-line array-callback-return
    return element.map((el: any, index: number): JSX.Element => {
      if (typeof el !== 'number') {
        return processPrereqs(el, index);
      } else return <></>;
    });
  };

  // Helper function that helps process course element prereqs
  const processPrereqs = (el: number, index: number): JSX.Element => {
    const alreadyDisplayed: React.Key[] = [];
    const parsed: {
      satisfied: boolean;
      jsx: JSX.Element;
    } = getNonStringPrereq(el);

    // If we already put this course in our prereqs, skip displaying it.
    if (parsed.jsx.key !== null && alreadyDisplayed.includes(parsed.jsx.key)) {
      // eslint-disable-next-line array-callback-return
      return <></>;
    } else if (parsed.jsx.key !== null) {
      alreadyDisplayed.push(parsed.jsx.key);
    }
    return (
      <p className="ml-2" key={el + index}>
        {parsed.jsx}
      </p>
    );
  };

  const getChevron = (): JSX.Element => {
    if (open)
      return <img src="svg/ChevronDown.svg" alt="" className="w-5 h-5" />;
    return <img src="svg/ChevronRight.svg" alt="" className="w-5 h-5" />;
  };

  return (
    <div
      onMouseEnter={() => {
        setRootHovered(true);
      }}
      onMouseLeave={() => {
        setRootHovered(false);
      }}
      className="transition duration-200 ease-in transform hover:scale-101"
    >
      <button
        onClick={() => {
          setOpen(!open);
        }}
        className={clsx(
          'focus:outline-none transform hover:scale-105 transition transition duration-100 duration-200 ease-in ease-in',
          {
            'text-green-700 hover:text-green-900': satisfied,
            'text-red-700 hover:text-red-900': !satisfied,
          },
        )}
      >
        <div className="flex flex-row w-auto h-auto font-medium">
          {satisfied ? (
            <img
              src="svg/CheckMark.svg"
              alt=""
              className={clsx('mr-1 w-5 h-5', {
                'text-green-700 group-hover:text-red-900': !satisfied,
                'text-green-700 group-hover:text-green-900': satisfied,
              })}
            />
          ) : (
            <>{getChevron()}</>
          )}

          <div className="text-sm">{text}</div>
        </div>
      </button>
      <div
        className={clsx('ml-2 border-l-2 border-opacity-50', {
          'border-green-200': satisfied && !rootHovered,
          'border-green-900': satisfied && rootHovered,
          'border-red-200 ': !satisfied && !rootHovered,
          'border-red-900 ': !satisfied && rootHovered,
        })}
      >
        {open ? getChildPrereqs() : null}
      </div>
    </div>
  );
};

export default PrereqDropdown;
