import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { getAPI } from './../../../resources/assets';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../slices/userSlice';
import { ThreadType, CommentType } from '../../../resources/commonTypes';
import Editor from './commentEditor/Editor';
import Markdown from 'markdown-to-jsx';

interface CommentBodyType {
  commenter_id: string;
  visible_user_id: string[];
  message: string;
  thread_id: any;
  date: string;
}

const Comment: FC<{
  upvote: number;
  username: string;
  content: string;
  threadID: any;
  date: string;
  subcomments: CommentType[];
  sort: string;
  updateRoadmapThreads: (thread: ThreadType) => void;
}> = ({
  upvote,
  username,
  content,
  threadID,
  date,
  subcomments,
  sort,
  updateRoadmapThreads,
}) => {
  const [isShown, setIsShown] = useState<boolean>(false);
  const [commentContent, setContent] = useState<string>('');
  const [subcommentContent, setSubCommentContent] = useState<CommentType[]>([]);

  const user = useSelector(selectUser);

  useEffect(() => {
    setSubCommentContent(subcomments);
  }, [subcomments]);

  const handleClick = () => {
    setIsShown((current) => !current);
  };
  const replyHandler = () => {
    setIsShown(!isShown);

    const comment: CommentBodyType = {
      commenter_id: user._id,
      message: commentContent,
      visible_user_id: [user._id],
      thread_id: threadID,
      date: new Date(Date.now()).toISOString().slice(0, 10),
    };

    axios
      .post(getAPI(window) + '/thread/reply', {
        comment,
      })
      .then((res) => {
        console.log('responser is ', res);

        setSubCommentContent([
          ...subcomments,
          {
            commenter_id: res.data.data.commenter_id,
            visible_user_id: res.data.data.visible_user_id,
            thread_id: res.data.data.thread_id,
            message: res.data.data.message,
            date: res.data.data.date,
            _id: res.data.data._id,
          },
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="md:mx-1 mx-20 flex flex-col">
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
            <div className="h-[40px]  text-[20px] text-[#393939] font-medium mt-[10px] text-center ml-[-65%]">
              {upvote}
            </div>
          </div>

          {/* name and content */}
          <div className=" w-full flex flex-col py-[16px] gap-4">
            <div className="h-[20px] text-[18px] text-black font-bold flex flex-row">
              <div className="">{username}</div>
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

            <div className="text-[20px]  font-medium">
              <Markdown>{content}</Markdown>
            </div>
            <div className="h-[20px] text-[20px] text-[#797877] font-medium flex flex-row">
              <div>{new Date(date).toISOString().slice(0, 10)}</div>
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

          <div className="h-[100%] rounded-[20px] border-2 mt-5 overflow-hidden">
            <Editor contents={commentContent} setContent={setContent} />
            <button
              onClick={() => {
                replyHandler();
                setContent('');
              }}
              className="absolute mt-[-75px] ml-[15px] w-[75px] h-[32px] rounded-[100px] bg-[#0C3A76] text-white"
            >
              {' '}
              submit
            </button>
          </div>
        </div>
      )}
      <div className="lg:ml-[5%] ml-[15%]">
        {subcommentContent.map((subs) =>
          subs.thread_id === threadID ? (
            <Comment
              key={(subs.commenter_id, "'s comment")}
              username={subs.commenter_id}
              upvote={0}
              content={subs.message}
              date={new Date(subs.date).toISOString().slice(0, 10)}
              threadID={subs.thread_id}
              subcomments={[]}
              updateRoadmapThreads={updateRoadmapThreads}
              sort={'default'}
            ></Comment>
          ) : (
            <></>
          ),
        )}
      </div>
    </div>
  );
};

export default Comment;
