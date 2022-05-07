import { BellIcon, ExclamationCircleIcon } from '@heroicons/react/solid';
import { Popover, Transition } from '@headlessui/react';
import { FC, Fragment, useEffect, useState } from 'react';
import { userService } from '../../../services';
import axios from 'axios';
import { getAPI } from '../../../resources/assets';

const Notification: FC<{
  userID: string;
}> = ({ userID }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    (async () => {
      setNotifications((await userService.getNotifications(userID)).data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="absolute z-[100] flex flex-row items-center justify-between px-4 text-xl top-3 right-20">
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
                            text-white group bg-white px-2 py-1.5 rounded-md inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <span>
                  <BellIcon className="h-6 text-black"></BellIcon>
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
                <Popover.Panel className="absolute w-80 max-w-none transform rounded-lg h-[20rem] overflow-y-auto -translate-x-52 translate-y-[8px] sm:px-0 lg:max-w-3xl">
                  <div className="overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="relative z-30 grid gap-8 bg-white p-7 lg:grid-cols-1">
                      <button
                        onClick={async () => {
                          const notifs = [...notifications];
                          setNotifications(
                            notifications.slice(
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
                            );
                            if (resp.status !== 200) {
                              console.log(resp.statusText);
                            }
                          }
                        }}
                      >
                        Read All
                      </button>
                      {notifications
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
                        <p className="text-sm font-medium text-center text-gray-900">
                          There are currently no new notifications!
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
