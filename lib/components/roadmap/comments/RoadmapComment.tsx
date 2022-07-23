import React, { FC, useState } from 'react';
import NewComment from './NewComment';
import Comment from './Comment';
import Dropbox from './Dropbox';

/**
 * Footer of landing page.
 */
const RoadmapComment: FC = () => {
  const [sort, setSort] = useState<string>('default');

  const updateSort = (sortSelected): void => {
    setSort(sortSelected);
  };

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
              sort={sort}
              list={['most recent', 'most liked']}
              updateSort={updateSort}
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
          />
        ))}
      </div>
    </div>
  );
};

export default RoadmapComment;
