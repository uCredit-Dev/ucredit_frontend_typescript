import React, { FC, useState } from 'react';

type DropboxProps = {
  updateSort: (m: any) => void;
  sort: string;
  list: string[];
};

const Dropbox: FC<DropboxProps> = ({ updateSort, sort, list }) => {
  const [isShown, setIsShown] = useState<boolean>(false);

  const handleClick = () => {
    // 👇️ toggle shown state
    setIsShown((current) => !current);
  };

  function tabClicked(m) {
    updateSort(m);
    handleClick();
  }

  return (
    <div>
      <button className="relative w-56 flex flex-row jutify-center items-center bg-white text-[#797877] text-[20px] rounded  group">
        <p className="px-2 w-[120px] text-left ">{sort}</p>
        <div className="p-2 " onClick={handleClick}>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        <div className="absolute top-full hidden group-focus:block w-[150px] bg-white  mt-1 rounded">
          <ul className="text-left rounded">
            {list.map((m, index) => {
              return (
                <>
                  {isShown && (
                    <li
                      className="px-2 py-2 hover:bg-gray-100 border-b "
                      onClick={() => tabClicked(m)}
                      key={index + '-dropbox-list'}
                    >
                      {m}
                    </li>
                  )}
                </>
              );
            })}
          </ul>
        </div>
      </button>
    </div>
  );
};

export default Dropbox;
