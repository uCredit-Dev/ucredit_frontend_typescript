import { FC, useEffect, useState } from 'react';
import {
  PlusIcon,
  PaperAirplaneIcon,
  AnnotationIcon,
} from '@heroicons/react/outline';
import { CommentType, ThreadType } from '../../resources/commonTypes';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPlan,
  selectReviewedPlan,
  selectThreads,
} from '../../slices/currentPlanSlice';
import { userService } from '../../services';
import { selectUser } from '../../slices/userSlice';

const Comments: FC<{
  location: string;
  hovered: boolean;
}> = ({ location, hovered }) => {
  const [expanded, setExpanded] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [thisThread, setThisThread] = useState<ThreadType>(null);
  const dispatch = useDispatch();
  const threads = useSelector(selectThreads);
  const currentPlan = useSelector(selectPlan);
  const user = useSelector(selectUser);
  const reviewedPlan = useSelector(selectReviewedPlan);

  useEffect(() => {
    setExpanded(false);
  }, [hovered]);

  useEffect(() => {
    setThisThread(threads.get(location));
  }, [threads]);

  const handleChange = (e) => {
    setReplyText(e.target.value);
  };

  const submitReply = async (e) => {
    e.preventDefault();
    if (thisThread) {
      const body = {
        comment: {
          commenter_id: user._id,
          visible_user_id: [user._id, reviewedPlan.user_id],
          thread_id: thisThread._id,
          message: replyText,
        },
      };
      const temp = await userService.postNewComment(body);
    } else {
      const data = {
        thread: {
          plan_id: reviewedPlan._id,
          location_type: location.split(' ')[0],
          location_id: location.split(' ')[1],
          resolved: false,
        },
        comment: {
          commenter_id: user._id,
          visible_user_id: [user._id, reviewedPlan.user_id],
          message: replyText,
        },
      };
      const temp = await userService.postNewThread(data);
    }
  };

  const getDate = (date: Date) => {
    return (
      date.getMonth() + '/' + date.getDate() + ' ' + date.toLocaleTimeString()
    );
  };

  const getComments = () => {
    if (!thisThread) return;
    const divs = thisThread.comments.map((c: CommentType) => {
      return (
        <div key={c.message}>
          <div className="font-bold">
            {c.commenter_id.name + ' - ' + getDate(new Date(c.date))}
          </div>
          <div>{c.message}</div>
        </div>
      );
    });
    return divs;
  };

  return (
    <div className="absolute pl-60 w-[30rem] h-12 z-[10000]">
      {expanded ? (
        <div className="bg-gray-100 rounded border shadow p-2">
          <div className="flex flex-col">{getComments()}</div>
          <div className="pt-2 flex flex-row items-center w-full">
            <form onSubmit={submitReply} className="flex-grow">
              <textarea
                value={replyText}
                onChange={handleChange}
                placeholder="Add a reply..."
                className="px-2 w-full"
                rows={3}
              />
            </form>
            <div
              className="rotate-90 ml-2 h-4 w-4 transform hover:scale-110"
              onClick={submitReply}
            >
              <PaperAirplaneIcon />
            </div>
          </div>
        </div>
      ) : thisThread ? (
        <AnnotationIcon
          className="z-20 mt-2 absolute w-4 h-4 text-black rounded-md outline-none stroke-2 cursor-pointer transform hover:scale-110 transition duration-150 ease-in"
          onClick={() => setExpanded(true)}
        />
      ) : hovered ? (
        <PlusIcon
          className="z-20 mt-2 absolute w-4 h-4 text-black rounded-md outline-none stroke-2 cursor-pointer transform hover:scale-110 transition duration-150 ease-in"
          onClick={() => setExpanded(true)}
        />
      ) : null}
    </div>
  );
};

export default Comments;
function postNewThread(data: {
  thread: { plan_id: string; location_type: string; location_id: string };
  comment: string;
}) {
  throw new Error('Function not implemented.');
}
