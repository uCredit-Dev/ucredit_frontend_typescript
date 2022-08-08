import React, { FC, useState } from 'react';
import axios from 'axios';
import { getAPI } from './../../../resources/assets';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../slices/userSlice';
import { ThreadType } from '../../../resources/commonTypes';
import { selectPlan } from '../../../slices/currentPlanSlice';
import Editor from './commentEditor/Editor';

interface ThreadBodyType extends ThreadType {
  comments?: undefined;
  _id?: undefined;
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

  const onCommentSubmit = () => {
    const thread: ThreadBodyType = {
      plan_id: currPlan._id,
      location_type: 'Plan',
      location_id: currPlan._id,
      resolved: false,
    };
    const comment: CommentBodyType = {
      commenter_id: user._id,
      message: content,
      visible_user_id: [user._id],
      date: new Date(Date.now()).toISOString().slice(0, 10),
    };

    axios
      .post(getAPI(window) + '/thread/new', {
        thread,
        comment,
      })
      .then((res) => {
        updateRoadmapThreads(res.data.data);
        setContent('');
      })
      .catch((error) => {
        console.log(error);
      });
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
