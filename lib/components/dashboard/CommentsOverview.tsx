import { Popover, Transition } from '@headlessui/react';
import { AnnotationIcon } from '@heroicons/react/outline';
import { Fragment, useEffect, useState } from 'react';
import {
  selectThreads,
  updateSelectedThread,
} from '../../slices/currentPlanSlice';
import { useDispatch, useSelector } from 'react-redux';
import { CommentType, ThreadType } from '../../resources/commonTypes';
import { selectUser } from '../../slices/userSlice';
import { formatDistance } from 'date-fns';

const CommentsOverview: React.FC = () => {
  const [threadJSX, setThreadJSX] = useState<JSX.Element[]>([]);

  const threadObjs = useSelector(selectThreads);
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const open = (id: string) => {
    dispatch(updateSelectedThread(id));
  };

  useEffect(() => {
    let temp: ThreadType[] = [];
    for (let k in threadObjs) {
      temp.push(threadObjs[k]);
    }
    let ts = temp.map((e) => {
      return getComments(e);
    });
    setThreadJSX(ts);
  }, threadObjs);

  const getComments = (thisThread: ThreadType): JSX.Element => {
    if (!thisThread) return null;
    let divs = thisThread.comments.map((c: CommentType) => {
      // console.log(c.message)
      if (
        !c.visible_user_id.includes(user._id) &&
        user._id !== c.commenter_id._id
      ) {
        return null;
      }
      return (
        <div
          key={c.message}
          className="bg-white border divide-y rounded select-text cursor-text m-2"
        >
          <p className="flex flex-wrap px-2 py-1 text-xs">
            {`${c.commenter_id.name} ${formatDistance(
              new Date(c.date),
              new Date(),
              { addSuffix: true },
            )}`}
          </p>
          <p className="px-2 py-1 font-medium text-sm">{c.message}</p>
        </div>
      );
    });
    divs = divs.filter((n) => n);
    const jump = (
      <div
        className="text-center bg-white border divide-y rounded my-2 mx-20 hover:cursor-pointer hover:shadow"
        onClick={() =>
          open(thisThread.location_type + ' ' + thisThread.location_id)
        }
      >
        <p className="px-2 py-1 font-medium text-sm">Go To</p>
      </div>
    );
    return divs.length === 0 ? null : (
      <div className="mb-5 bg-gray-200 rounded">
        {divs} {jump}
      </div>
    );
  };

  return (
    <div className="flex flex-row justify-between items-center px-4 text-xl">
      <div className="w-full max-w-sm">
        <Popover className="relative">
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
                <Popover.Panel className="absolute z-10 w-80 max-w-none transform -translate-x-52 translate-y-2 sm:px-0 lg:max-w-3xl">
                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="relative grid bg-white p-7 lg:grid-cols-1 z-30">
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
