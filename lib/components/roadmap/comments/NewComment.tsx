import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectToken, selectUser } from '../../../slices/userSlice';
import { ThreadType } from '../../../resources/commonTypes';
import Editor from './commentEditor/Editor';
import { userService } from '../../../services';

interface ThreadBodyType extends ThreadType {
  comments: [];
  _id: '';
}

interface CommentBodyType {
  commenter_id: string;
  visible_user_id: string[];
  message: string;
  date: string;
}

const NewComment: FC<{
  updateRoadmapThreads: (thread: ThreadType) => void;
}> = ({ updateRoadmapThreads }) => {
  const user = useSelector(selectUser);
  // const currPlan = useSelector(selectPlan);
  const currPlan = { _id: '62d8875b5b6fb8734aa09679' };
  const [content, setContent] = useState('');
  const token = useSelector(selectToken);

  const onCommentSubmit = () => {
    const thread: ThreadBodyType = {
      plan_id: currPlan._id,
      location_type: 'Plan',
      location_id: currPlan._id,
      resolved: false,
      comments: [],
      _id: '',
    };
    const comment: CommentBodyType = {
      commenter_id: user._id,
      message: content,
      visible_user_id: [user._id],
      date: new Date(Date.now()).toISOString().slice(0, 10),
    };

    (async () => {
      const newThread = await userService
        .postNewThread({ thread, comment }, token)
        .catch((error) => {
          console.log(error);
        });
      updateRoadmapThreads(newThread.data.data);
      setContent('');
    })();
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps

  return (
    <div className="h-[100%] rounded-[20px] border-2 mt-5 overflow-hidden">
      <Editor contents={content} setContent={setContent} />
      <button
        onClick={() => {
          onCommentSubmit();
          setContent('');
        }}
        className="absolute mt-[-75px] ml-[15px] w-[75px] h-[32px] rounded-[100px] bg-[#0C3A76] text-white"
      >
        {' '}
        submit
      </button>
    </div>
  );
};

export default NewComment;
