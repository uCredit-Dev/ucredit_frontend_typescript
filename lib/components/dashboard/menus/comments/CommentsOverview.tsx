import { Popover, Transition } from '@headlessui/react';
import { AnnotationIcon } from '@heroicons/react/outline';
import React, { Fragment, useEffect, useState } from 'react';
import {
  selectFilteredThreads,
  updateSelectedThread,
} from '../../../../slices/currentPlanSlice';
import { useDispatch, useSelector } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';
import { selectUser } from '../../../../slices/userSlice';
import { selectPlan } from '../../../../slices/currentPlanSlice';
import CommenterToggle from './CommenterToggle';
import { CommentType, ThreadType } from '../../../../resources/commonTypes';
import * as amplitude from '@amplitude/analytics-browser';

const CommentsOverview: React.FC = () => {
  const [threadJSX, setThreadJSX] = useState<JSX.Element[]>([]);
  const [numComments, setNumComments] = useState(0);

  const threadObjs = useSelector(selectFilteredThreads);
  const user = useSelector(selectUser);
  const currentPlan = useSelector(selectPlan);

  const dispatch = useDispatch();

  const open = (id: string) => {
    dispatch(updateSelectedThread(id));
  };

  useEffect(() => {
    let comments = 0;
    const temp: ThreadType[] = [];
    for (let k in threadObjs) {
      if (threadObjs[k].plan_id === currentPlan._id) {
        temp.push(threadObjs[k]);
        comments += threadObjs[k].comments.length;
      }
    }
    setNumComments(comments);
    const ts = temp.map((e) => {
      return <div key={e._id}>{getComments(e)}</div>;
    });
    setThreadJSX(ts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threadObjs]);

  const getComments = (thisThread: ThreadType): JSX.Element => {
    if (!thisThread) return <></>;
    let divs = thisThread.comments.map((c: CommentType) => {
      if (
        !c.visible_user_id.includes(user._id) &&
        user._id !== c.commenter_id._id
      ) {
        return <></>;
      }
      return (
        <div
          key={c._id + c.date}
          className="m-2 bg-white border divide-y rounded select-text cursor-text"
        >
          <div className="flex items-center justify-between w-full px-2 py-1 text-sm">
            <p className="w-[50%] font-medium truncate">
              {c.commenter_id.name}
            </p>
            <p className="text-xs truncate">
              {formatDistanceToNow(new Date(c.date), {
                addSuffix: true,
              })}
            </p>
          </div>
          <p className="px-2 py-1 text-sm font-medium">{c.message}</p>
        </div>
      );
    });
    divs = divs.filter((n) => n);
    const jump = (
      <div
        className="mx-20 my-2 text-center bg-white border divide-y rounded hover:cursor-pointer hover:shadow"
        onClick={() =>
          open(thisThread.location_type + ' ' + thisThread.location_id)
        }
      >
        <p className="px-2 py-1 text-sm font-medium">Go To</p>
      </div>
    );
    return divs.length === 0 ? (
      <></>
    ) : (
      <div className="mb-2 bg-gray-200 rounded">
        {divs} {jump}
      </div>
    );
  };

  return (
    <div className="flex flex-row text-xl">
      <div className="w-full h-full max-w-sm">
        <Popover className="h-full">
          {({ open }) => (
            <>
              <Popover.Button
                className={`
                            ${open ? '' : 'text-opacity-90'}
                            w-full hover:bg-slate-300 text-lg rounded-lg sm:w-auto px-3 py-1 sm:hover:text-blue-header sm:hover:bg-blue-footer sm:rounded-[13px] transition duration-100 ease-in`}
                onClick={() => {
                  amplitude.track('Opened Comments Overview');
                }}
              >
                <span>
                  <AnnotationIcon className="h-6" />
                </span>
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute z-[100] transform translate-x-[-140px] bg-white rounded-lg translate-y-[8px] w-80 max-w-none sm:px-0 lg:max-w-3xl h-[70vh]">
                  <div className="h-full rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="z-30 grid max-h-full overflow-y-auto bg-white rounded-lg p-7 lg:grid-cols-1">
                      {numComments > 0 ? (
                        <CommenterToggle className="mb-3" />
                      ) : null}
                      {numComments > 0 ? (
                        threadJSX
                      ) : (
                        <p className="text-sm italic text-center text-slate-500">
                          Looks like there's no comment yet
                        </p>
                      )}
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  );
};

export default CommentsOverview;
