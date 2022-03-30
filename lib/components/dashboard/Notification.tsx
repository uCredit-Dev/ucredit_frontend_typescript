import { useState } from 'react';
import { BellIcon, ExclamationCircleIcon } from '@heroicons/react/solid';
import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'

const notifications = [
    // {
    //     name: 'Ali Madooei has approved your "Imported New CS Major" plan!',
    //     description: '2d ago',
    //     href: '##',
    // },
    // {
    //     name: 'Ali Madooei left some comments on your "Imported New CS Major" plan.',
    //     description: '2d ago',
    //     href: '##',
    // },
    // {
    //     name: 'Sara More has approved your "Imported New CS Major" plan!',
    //     description: '1w ago',
    //     href: '##',
    // },
]

const Notification = () => {
    const [notifState, setNotifState] = useState(true);
    return (
      <div className="flex flex-row justify-between items-center px-4 text-xl">
        {notifications.length !== 0 ?
            <ExclamationCircleIcon className="bg-white rounded-full absolute h-5 text-red-500 right-32 bottom-9 z-50"></ExclamationCircleIcon>
        : null}
        <div className="w-full max-w-sm">
            <Popover className="relative">
                {({ open }) => (
                <>
                    <Popover.Button
                        className={`
                            ${open ? '' : 'text-opacity-90'}
                            text-white group bg-white px-2 py-1.5 rounded-md inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                        >
                        <span><BellIcon className="h-6 text-black"></BellIcon></span>
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
                            <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-1 z-30">
                                {notifications.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                >
                                    <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-900">
                                        {item.name}
                                    </p>
                                    <p className="text-sm text-gray-500 text-right pt-1">
                                        {item.description}
                                    </p>
                                    </div>
                                </a>
                                ))}
                                {notifications.length === 0 ?
                                    <p className="text-sm font-medium text-gray-900">There are currently no new notifications!</p>
                                : null}
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