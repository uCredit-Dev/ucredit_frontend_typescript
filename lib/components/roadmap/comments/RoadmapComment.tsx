import React, { FC, useState, useEffect } from 'react';
import NewComment from './NewComment';
import Comment from './Comment';
import Dropbox from './Dropbox';
import axios from 'axios';
import { getAPI } from './../../../resources/assets';
import { useSelector } from 'react-redux';
import { ThreadType } from '../../../resources/commonTypes';
import { selectPlan } from '../../../slices/currentPlanSlice';

const RoadmapComment: FC = () => {
  const [sort, setSort] = useState<string>('default');
  const [allThreads, setAllThreads] = useState<ThreadType[]>([]);

  // const currPlan = useSelector(selectPlan);
  const currPlan = { _id: '62d8875b5b6fb8734aa09679' };

  useEffect(() => {
    axios
      .get(getAPI(window) + `/thread/getByPlan/${currPlan._id}`)
      .then((response) => {
        const sorted = response.data.data.sort((a, b) =>
          Date.parse(a.date) > Date.parse(b.date) ? 1 : -1,
        );
        setAllThreads(sorted);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currPlan._id]);

  const updateSort = (sortSelected): void => {
    setSort(sortSelected);
  };
  const updateRoadmapThreads = (thread: ThreadType): void => {
    thread.comments[0].commenter_id = {
      name: thread.comments[0].commenter_id,
      _id: thread.comments[0].commenter_id,
    };
    setAllThreads([thread, ...allThreads]);
  };
  return (
    <div className="w-full flex flex-col">
      {/* filter bar */}
      <div className="items-center h-[70px] py-4 flex flex-row pl-[75px] text-[20px] border-b-2 border-[#89CEEB] ">
        <div className="mx-auto md:mx-[3.7rem] flex">
          <div className="mr-12 text-[#393939] ">Comments</div>
          <div className="text-[#797877] flex flex-row ">
            <div>sort by:</div>
            <div className="mt-[-2px]">
              <Dropbox
                sort={sort}
                list={['most recent', 'most liked']}
                updateSort={updateSort}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mb-20 md:mx-32 mx-12 flex flex-col gap-1">
        <NewComment updateRoadmapThreads={updateRoadmapThreads} />
        {allThreads.length > 0 &&
          allThreads.map((thread) =>
            thread.comments
              ?.slice(0, 1)
              .map((comment) =>
                thread._id != null ? (
                  <Comment
                    key={comment.commenter_id.name + comment.message}
                    username={comment.commenter_id.name}
                    upvote={0}
                    content={comment.message}
                    date={comment.date}
                    threadID={thread._id}
                    subcomments={thread.comments.slice(1)}
                    updateRoadmapThreads={updateRoadmapThreads}
                  />
                ) : (
                  <></>
                ),
              ),
          )}
      </div>
    </div>
  );
};

export default RoadmapComment;
function setData(data: any) {
  throw new Error('Function not implemented.');
}
