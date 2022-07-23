import React, { Component } from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';
/**
 * Footer of landing page.
 */
class DashboardComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: 'default',
    };
  }

  updateSort = (sortSelected) => {
    this.setState((state) => {
      console.log('hi');
      return {
        sort: sortSelected,
      };
    });
  };

  render() {
    const allComments = [
      {
        upvote: 42,
        username: 'name',
        date: '2022-07-08',
        content: 'This is one of the plans of all time',
        id: '',
      },
      {
        upvote: 42,
        username: 'name',
        date: '2022-07-05',
        content: 'L plan',
        id: '',
      },
    ];

    return (
      <div className="w-full flex flex-col">
        {/* filter bar */}
        <div className="h-[70px] py-4 flex flex-row pl-[75px] text-[20px] border-b-2 border-[#89CEEB] w-full">
          <div className="w-[150px] text-[#393939]">Comments</div>
          <div className="text-[#797877] flex flex-row ">
            <div>sort by:</div>
            <div className="mt-[-2px]">
              <Dropbox
                sort={this.state.sort}
                list={['most recent', 'most liked']}
                updateSort={this.updateSort}
              />
            </div>
          </div>
        </div>
        <div className="mb-40 flex flex-col gap-1">
          <NewComment />
          {allComments.map((comments) => (
            <Comment
              username={comments.username}
              upvote={comments.upvote}
              content={comments.content}
              date={comments.date}
            ></Comment>
          ))}
        </div>
      </div>
    );
  }
}

function NewComment(props) {
  const [isShown, setIsShown] = useState(false);

  const handleClick = (event) => {
    // 👇️ toggle shown state
    setIsShown((current) => !current);
  };

  return (
    <div className="mx-16 h-[165px] rounded-[20px] w-[93%] border-2 mt-5 px-10 py-6">
      <textarea
        className=" w-full h-[80px]"
        placeholder="comment here"
      ></textarea>
      <button className="w-[75px] h-[32px] rounded-[100px] bg-[#0C3A76] text-white">
        {' '}
        submit{' '}
      </button>
    </div>
  );
}

function Comment(props) {
  const [isShown, setIsShown] = useState(false);

  const handleClick = (event) => {
    setIsShown((current) => !current);
  };
  const allSubComments = [
    {
      upvote: 38,
      username: 'name',
      date: '2022-07-08',
      content: 'Thank you for the plan.',
      id: '',
    },
  ];
  return (
    <div>
      <div className="mx-16 flex flex-col">
        <div className="h-auto w-full flex flex-row ">
          {/* upvote */}
          <div className="w-[60px] text-[#393939] flex flex-col ">
            <div className="mt-[30px]">
              <svg
                width="19"
                height="11"
                viewBox="0 0 19 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.625 7.79133L10.6538 0.901327C10.5027 0.749018 10.323 0.628128 10.1249 0.545628C9.92692 0.463129 9.71453 0.420654 9.50001 0.420654C9.28549 0.420654 9.07309 0.463129 8.87507 0.545628C8.67705 0.628128 8.49732 0.749018 8.34626 0.901327L1.45626 7.79133C1.30395 7.94239 1.18306 8.12212 1.10056 8.32014C1.01806 8.51816 0.975586 8.73056 0.975586 8.94508C0.975586 9.15959 1.01806 9.37199 1.10056 9.57001C1.18306 9.76803 1.30395 9.94776 1.45626 10.0988C1.76072 10.4015 2.17258 10.5714 2.60188 10.5714C3.03118 10.5714 3.44304 10.4015 3.74751 10.0988L9.50001 4.34633L15.2525 10.0988C15.5552 10.399 15.9637 10.5683 16.39 10.5701C16.6039 10.5713 16.8159 10.5303 17.0139 10.4495C17.2118 10.3686 17.3919 10.2494 17.5438 10.0988C17.7015 9.9532 17.8288 9.77775 17.9184 9.58263C18.0079 9.38751 18.0579 9.17657 18.0655 8.96202C18.073 8.74746 18.038 8.53353 17.9624 8.33259C17.8868 8.13166 17.7721 7.94769 17.625 7.79133Z"
                  fill="#393939"
                />
              </svg>
            </div>
            <div className="h-[40px] text-[20px] text-[#393939] font-medium mt-[10px] ml-[-3px]">
              {props.upvote}
            </div>
          </div>

          {/* name and content */}
          <div className="text-[#797877] w-full flex flex-col py-[16px] gap-4">
            <div className="h-[20px] text-[18px] text-black font-bold flex flex-row">
              <div className="">{props.username}</div>
              <div className="ml-[40px] mt-[13px]">
                <svg
                  width="18"
                  height="4"
                  viewBox="0 0 18 4"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 0C8.60444 0 8.21776 0.117298 7.88886 0.337061C7.55996 0.556824 7.30362 0.869181 7.15224 1.23463C7.00087 1.60009 6.96126 2.00222 7.03843 2.39018C7.1156 2.77814 7.30608 3.13451 7.58579 3.41421C7.86549 3.69392 8.22186 3.8844 8.60982 3.96157C8.99778 4.03874 9.39992 3.99913 9.76537 3.84776C10.1308 3.69638 10.4432 3.44004 10.6629 3.11114C10.8827 2.78224 11 2.39556 11 2C11 1.46957 10.7893 0.96086 10.4142 0.585787C10.0391 0.210714 9.53043 0 9 0ZM2 0C1.60444 0 1.21776 0.117298 0.88886 0.337061C0.559962 0.556824 0.303617 0.869181 0.152242 1.23463C0.000866562 1.60009 -0.0387401 2.00222 0.0384303 2.39018C0.115601 2.77814 0.306082 3.13451 0.585787 3.41421C0.865492 3.69392 1.22186 3.8844 1.60982 3.96157C1.99778 4.03874 2.39992 3.99913 2.76537 3.84776C3.13082 3.69638 3.44318 3.44004 3.66294 3.11114C3.8827 2.78224 4 2.39556 4 2C4 1.46957 3.78929 0.96086 3.41421 0.585787C3.03914 0.210714 2.53043 0 2 0ZM16 0C15.6044 0 15.2178 0.117298 14.8889 0.337061C14.56 0.556824 14.3036 0.869181 14.1522 1.23463C14.0009 1.60009 13.9613 2.00222 14.0384 2.39018C14.1156 2.77814 14.3061 3.13451 14.5858 3.41421C14.8655 3.69392 15.2219 3.8844 15.6098 3.96157C15.9978 4.03874 16.3999 3.99913 16.7654 3.84776C17.1308 3.69638 17.4432 3.44004 17.6629 3.11114C17.8827 2.78224 18 2.39556 18 2C18 1.46957 17.7893 0.96086 17.4142 0.585787C17.0391 0.210714 16.5304 0 16 0Z"
                    fill="#393939"
                  />
                </svg>
              </div>
            </div>

            <div className="h-[20px] text-[20px] text-black font-medium">
              {props.content}
            </div>
            <div className="h-[20px] text-[20px] text-[#797877] font-medium flex flex-row">
              <div>{props.date}</div>
              <div
                className="ml-[50px] underline mt-[-2px] "
                onClick={handleClick}
              >
                reply
              </div>
            </div>
          </div>
        </div>
      </div>
      {isShown && (
        <div
          className="z-10 w-full transition-opacity "
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div
            onClick={() => setIsShown(!isShown)}
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          ></div>

          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0 z-10 overflow-auto">
            {/*
          Modal panel, show/hide based on modal state.
  
          Entering: "ease-out duration-300"
            From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            To: "opacity-100 translate-y-0 sm:scale-100"
          Leaving: "ease-in duration-200"
            From: "opacity-100 translate-y-0 sm:scale-100"
            To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
  */}
            <div className=" w-[200%] h-[165px] group-click:block z-20 bg-white border-2 mt-10 ">
              <textarea
                className="w-[95%]  m-4 h-[80px]"
                placeholder="reply here"
              ></textarea>
              <button
                onClick={() => setIsShown(!isShown)}
                className="w-[75px] h-[32px] rounded-[100px] bg-[#0C3A76] text-white"
              >
                {' '}
                submit{' '}
              </button>
            </div>
          </div>
        </div>
      )}
      {allSubComments.map((comments) => (
        <SubComment
          username={comments.username}
          upvote={comments.upvote}
          content={comments.content}
          date={comments.date}
        ></SubComment>
      ))}
    </div>
  );
}

function SubComment(props) {
  const [isShown, setIsShown] = useState(false);

  const handleClick = (event) => {
    // 👇️ toggle shown state
    setIsShown((current) => !current);

    // 👇️ or simply set it to true
    // setIsShown(true);
  };

  return (
    <div>
      <div className="ml-[10%] h-[130px] w-full flex flex-row ">
        {/* upvote */}
        <div className="w-[60px] text-[#393939] flex flex-col ">
          <div className="mt-[30px]">
            <svg
              width="19"
              height="11"
              viewBox="0 0 19 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.625 7.79133L10.6538 0.901327C10.5027 0.749018 10.323 0.628128 10.1249 0.545628C9.92692 0.463129 9.71453 0.420654 9.50001 0.420654C9.28549 0.420654 9.07309 0.463129 8.87507 0.545628C8.67705 0.628128 8.49732 0.749018 8.34626 0.901327L1.45626 7.79133C1.30395 7.94239 1.18306 8.12212 1.10056 8.32014C1.01806 8.51816 0.975586 8.73056 0.975586 8.94508C0.975586 9.15959 1.01806 9.37199 1.10056 9.57001C1.18306 9.76803 1.30395 9.94776 1.45626 10.0988C1.76072 10.4015 2.17258 10.5714 2.60188 10.5714C3.03118 10.5714 3.44304 10.4015 3.74751 10.0988L9.50001 4.34633L15.2525 10.0988C15.5552 10.399 15.9637 10.5683 16.39 10.5701C16.6039 10.5713 16.8159 10.5303 17.0139 10.4495C17.2118 10.3686 17.3919 10.2494 17.5438 10.0988C17.7015 9.9532 17.8288 9.77775 17.9184 9.58263C18.0079 9.38751 18.0579 9.17657 18.0655 8.96202C18.073 8.74746 18.038 8.53353 17.9624 8.33259C17.8868 8.13166 17.7721 7.94769 17.625 7.79133Z"
                fill="#393939"
              />
            </svg>
          </div>
          <div className="h-[40px] text-[20px] text-[#393939] font-medium mt-[10px] ml-[-3px]">
            {props.upvote}
          </div>
        </div>

        {/* name and content */}
        <div className="text-[#797877] w-full flex flex-col py-[16px] gap-4">
          <div className="h-[20px] text-[18px] text-black font-bold flex flex-row">
            <div className=""> {props.username}</div>
            <div className="ml-[40px] mt-[13px]">
              <svg
                width="18"
                height="4"
                viewBox="0 0 18 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 0C8.60444 0 8.21776 0.117298 7.88886 0.337061C7.55996 0.556824 7.30362 0.869181 7.15224 1.23463C7.00087 1.60009 6.96126 2.00222 7.03843 2.39018C7.1156 2.77814 7.30608 3.13451 7.58579 3.41421C7.86549 3.69392 8.22186 3.8844 8.60982 3.96157C8.99778 4.03874 9.39992 3.99913 9.76537 3.84776C10.1308 3.69638 10.4432 3.44004 10.6629 3.11114C10.8827 2.78224 11 2.39556 11 2C11 1.46957 10.7893 0.96086 10.4142 0.585787C10.0391 0.210714 9.53043 0 9 0ZM2 0C1.60444 0 1.21776 0.117298 0.88886 0.337061C0.559962 0.556824 0.303617 0.869181 0.152242 1.23463C0.000866562 1.60009 -0.0387401 2.00222 0.0384303 2.39018C0.115601 2.77814 0.306082 3.13451 0.585787 3.41421C0.865492 3.69392 1.22186 3.8844 1.60982 3.96157C1.99778 4.03874 2.39992 3.99913 2.76537 3.84776C3.13082 3.69638 3.44318 3.44004 3.66294 3.11114C3.8827 2.78224 4 2.39556 4 2C4 1.46957 3.78929 0.96086 3.41421 0.585787C3.03914 0.210714 2.53043 0 2 0ZM16 0C15.6044 0 15.2178 0.117298 14.8889 0.337061C14.56 0.556824 14.3036 0.869181 14.1522 1.23463C14.0009 1.60009 13.9613 2.00222 14.0384 2.39018C14.1156 2.77814 14.3061 3.13451 14.5858 3.41421C14.8655 3.69392 15.2219 3.8844 15.6098 3.96157C15.9978 4.03874 16.3999 3.99913 16.7654 3.84776C17.1308 3.69638 17.4432 3.44004 17.6629 3.11114C17.8827 2.78224 18 2.39556 18 2C18 1.46957 17.7893 0.96086 17.4142 0.585787C17.0391 0.210714 16.5304 0 16 0Z"
                  fill="#393939"
                />
              </svg>
            </div>
          </div>

          <div className="h-[20px] text-[20px] text-black font-medium">
            {props.content}
          </div>
          <div className="h-[20px] text-[20px] text-[#797877] font-medium flex flex-row">
            <div> {props.date}</div>
            <div
              className="ml-[50px] underline mt-[-2px] "
              onClick={handleClick}
            >
              reply
            </div>
          </div>
        </div>
      </div>
      {isShown && (
        <div
          className="z-10 w-full"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          {/*
    Background backdrop, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100"
      To: "opacity-0"
  */}
          <div
            onClick={() => setIsShown(!isShown)}
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          ></div>

          <div className="flex  min-h-full p-4 text-center sm:p-0 z-10 overflow-auto">
            {/*
        Modal panel, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          To: "opacity-100 translate-y-0 sm:scale-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100 translate-y-0 sm:scale-100"
          To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
*/}
            <div className=" w-[200%] h-[165px] group-click:block z-20 bg-white border-2 mt-10 ">
              <textarea
                className="w-[95%]  m-4 h-[80px]"
                placeholder="reply here"
              ></textarea>
              <button
                onClick={() => setIsShown(!isShown)}
                className="w-[75px] h-[32px] rounded-[100px] bg-[#0C3A76] text-white"
              >
                {' '}
                submit{' '}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Dropbox(props) {
  const [isShown, setIsShown] = useState(false);

  const handleClick = (event) => {
    // 👇️ toggle shown state
    setIsShown((current) => !current);
  };
  function tabClicked(m) {
    props.updateSort(m);
  }

  return (
    <div>
      <button className="relative w-56 flex flex-row jutify-center items-center bg-white text-[#797877] text-[20px] rounded  group">
        <p className="px-2 w-[120px] text-left ">{props.sort}</p>
        <div className="p-2 " onClick={handleClick}>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        <div className="absolute top-full hidden group-focus:block w-[150px] bg-white  mt-1 rounded">
          <ul className="text-left rounded">
            {props.list.map((m, index) => {
              return (
                <>
                  {isShown && (
                    <li
                      className="px-2 py-2 hover:bg-gray-100 border-b "
                      onClick={() => tabClicked(m)}
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
}

export default DashboardComment;
