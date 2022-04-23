import { Popover, Transition } from '@headlessui/react';
import { AnnotationIcon } from '@heroicons/react/outline';
import { Fragment, useEffect, useState } from 'react';
import {
  selectFilteredThreads,
  updateSelectedThread,
} from '../../../../slices/currentPlanSlice';
import { useDispatch, useSelector } from 'react-redux';
import { formatDistance } from 'date-fns';
import { selectUser } from '../../../../slices/userSlice';
import CommenterToggle from './CommenterToggle';
import { CommentType, ThreadType } from '../../../../resources/commonTypes';

const CommentsOverview: React.FC = () => {
  const [threadJSX, setThreadJSX] = useState<JSX.Element[]>([]);

  const threadObjs = useSelector(selectFilteredThreads);
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const open = (id: string) => {
    dispatch(updateSelectedThread(id));
  };

  useEffect(() => {
    const temp = [];
    for (let k in threadObjs) {
      temp.push(threadObjs[k]);
    }
    const ts = temp.map((e) => getComments(e));
    setThreadJSX(ts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threadObjs]);

  const getComments = (thisThread: ThreadType): JSX.Element => {
    if (!thisThread) return null;
    let divs = thisThread.comments.map((c: CommentType) => {
      if (
        !c.visible_user_id.includes(user._id) &&
        user._id !== c.commenter_id._id
      ) {
        return null;
      }
      return (
        <div
          key={c._id + c.date}
          className="m-2 bg-white border divide-y rounded select-text cursor-text"
        >
          <p className="flex flex-wrap px-2 py-1 text-xs">
            {`${c.commenter_id.name} ${formatDistance(
              new Date(c.date),
              new Date(),
              { addSuffix: true },
            )}`}
          </p>
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
    return divs.length === 0 ? null : (
      <div className="mb-2 bg-gray-200 rounded">
        {divs} {jump}
      </div>
    );
  };

  return (
    <div className="absolute right-[155px] z-40 flex flex-row items-center justify-between px-4 text-xl top-[12px]">
      <div className="w-full max-w-sm">
        <Popover className="">
          {({ open }) => (
            <>
              <Popover.Button
                className={`
                            ${open ? '' : 'text-opacity-90'}
                            text-white group bg-white px-2 py-1.5 rounded-md inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <span>
                  <AnnotationIcon className="h-6 text-black" />
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
                <Popover.Panel className="absolute z-10 transform translate-x-[-140px] translate-y-2 w-80 max-w-none sm:px-0 lg:max-w-3xl">
                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="z-30 grid bg-white p-7 lg:grid-cols-1">
                      <CommenterToggle className="mb-3" />
                      {threadJSX}
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
