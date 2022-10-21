import { BellIcon, ExclamationCircleIcon } from '@heroicons/react/solid';
import { Popover, Transition } from '@headlessui/react';
import React, { FC, Fragment, useEffect, useState } from 'react';
import { userService } from '../../../services';
import axios from 'axios';
import { compareDesc } from 'date-fns';
import { getAPI } from '../../../resources/assets';
import { selectToken } from '../../../slices/userSlice';
import { useSelector } from 'react-redux';

const Notification: FC<{
  userID: string;
}> = ({ userID }) => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const token = useSelector(selectToken);

  useEffect(() => {
    (async () => {
      let data = await userService.getNotifications(userID, token);
      data = data.data.sort((d1, d2) =>
        compareDesc(new Date(d1.date), new Date(d2.date)),
      );
      setNotifications(data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-row items-center justify-between px-4 text-xl">
      {notifications.length !== 0 ? (
        <ExclamationCircleIcon className="relative z-50 w-5 h-4 text-red-500 bg-white rounded-full -right-12 -top-4"></ExclamationCircleIcon>
      ) : null}
      <div className="w-full max-w-sm">
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={`
                            ${open ? '' : 'text-opacity-90'}
                            w-full hover:bg-slate-300 text-lg rounded-lg sm:w-auto px-3 py-1 sm:hover:text-blue-header sm:hover:bg-blue-footer sm:rounded-[13px] transition duration-100 ease-in`}
              >
                <span>
                  <BellIcon className="h-6 "></BellIcon>
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
                <Popover.Panel className="z-[100] absolute w-80 max-w-none transform rounded-lg max-h-[20rem] overflow-y-auto -translate-x-52 translate-y-[8px] sm:px-0 lg:max-w-3xl shadow-md">
                  <div className="rounded-lg ring-1 ring-black ring-opacity-5">
                    <div className="relative z-30 grid gap-8 bg-white rounded-lg p-7 lg:grid-cols-1">
                      {notifications.length !== 0 ? (
                        <div className="flex justify-end w-full">
                          <button
                            className="text-sm underline transition-colors duration-150 ease-in underline-offset-1 text-slate-500 hover:text-slate-800"
                            onClick={async () => {
                              const notifs: any[] = [...notifications];
                              setNotifications(
                                notifications
                                  .reverse()
                                  .slice(
                                    notifications.length < 100
                                      ? notifications.length
                                      : 100,
                                    notifications.length,
                                  ),
                              );
                              for (
                                let i = 0;
                                i <
                                (notifications.length < 100
                                  ? notifications.length
                                  : 100);
                                i++
                              ) {
                                const resp = await axios.delete(
                                  getAPI(window) +
                                    `/notifications/${notifs[i]._id}`,
                                  {
                                    headers: { "Authorization" : `Bearer ${token}` }, 
                                  }
                                );
                                if (resp.status !== 200) {
                                  console.log(resp.statusText);
                                }
                              }
                            }}
                          >
                            Read All
                          </button>
                        </div>
                      ) : null}
                      {notifications
                        .reverse()
                        .slice(
                          0,
                          notifications.length < 100
                            ? notifications.length
                            : 100,
                        )
                        .map((item) => (
                          <a
                            key={item._id}
                            href={item.href}
                            className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                          >
                            <div className="ml-4">
                              <p className="text-sm font-medium text-gray-900">
                                {item.message}
                              </p>
                              <p className="pt-1 text-sm text-right text-gray-500">
                                {item.date.substring(0, 10)}
                              </p>
                            </div>
                          </a>
                        ))}
                      {notifications.length === 0 ? (
                        <p className="text-sm italic text-center text-slate-500">
                          Looks like there're no notifications yet!
                        </p>
                      ) : null}
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

export default Notification;
