import { FC, useEffect, useRef, useState } from 'react';
import {
  PaperAirplaneIcon,
  AnnotationIcon,
  ChatAlt2Icon,
} from '@heroicons/react/outline';
import {
  CommentType,
  ReviewMode,
  ThreadType,
} from '../../resources/commonTypes';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPlan,
  selectReviewedPlan,
  selectThreads,
  updateCurrentComment,
  updateSelectedPlan,
  updateThreads,
} from '../../slices/currentPlanSlice';
import { userService } from '../../services';
import { selectUser } from '../../slices/userSlice';
import clsx from 'clsx';
import Select from 'react-select';
import { format, formatDistance } from 'date-fns';

const Comments: FC<{
  location: string;
  hovered: boolean;
  mode: ReviewMode;
  left?: boolean;
}> = ({ location, hovered, left, mode }) => {
  const [expanded, setExpanded] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [thisThread, setThisThread] = useState<ThreadType>(null);
  const dispatch = useDispatch();
  const threads = useSelector(selectThreads);
  const user = useSelector(selectUser);
  const plan = useSelector(selectPlan);
  const reviewedPlan = useSelector(selectReviewedPlan);
  let wrapperRef = useRef(null);

  useEffect(() => {
    setThisThread(threads[location]);
  }, [threads]);

  const handleChange = (e) => {
    setReplyText(e.target.value);
  };

  useEffect(() => {
    if (plan.reviewers !== undefined) {
      (async () => {
        const reviewers = (await userService.getPlanReviewers(plan._id)).data;
        dispatch(updateSelectedPlan({ ...plan, reviewers: reviewers }));
      })();
    }
  }, []);

  const submitReply = async (e) => {
    e.preventDefault();
    if (replyText === '') {
      return;
    }
    const planToAdd = reviewedPlan ? reviewedPlan : plan;
    if (thisThread) {
      const body = {
        comment: {
          commenter_id: user._id,
          visible_user_id: [user._id, planToAdd.user_id],
          thread_id: thisThread._id,
          message: replyText,
        },
      };
      const temp = await userService.postNewComment(body);
      const newComment = temp.data;
      newComment.commenter_id = {
        _id: user._id,
        name: user.name,
      };
      dispatch(updateCurrentComment([newComment, location]));
      setReplyText('');
    } else {
      console.log(user._id);
      const data = {
        thread: {
          plan_id: planToAdd._id,
          location_type: location.split(' ')[0],
          location_id: location.split(' ')[1],
          resolved: false,
        },
        comment: {
          commenter_id: user._id,
          visible_user_id: [user._id, planToAdd.user_id],
          message: replyText,
        },
      };
      console.log('asdf', data);
      const temp = await userService.postNewThread(data);
      console.log('values are', threads, location);
      JSON.parse(JSON.stringify(threads));
      let threadCopy = JSON.parse(JSON.stringify(threads));
      threadCopy[location] = temp.data;
      threadCopy[location].comments[0].commenter_id = {
        _id: user._id,
        name: user.name,
      };
      console.log('copy is', threadCopy);
      dispatch(updateThreads(Object.values(threadCopy)));
      setThisThread(temp.data);
    }
  };

  const getComments = () => {
    if (!thisThread) return;
    const divs = thisThread.comments.map((c: CommentType) => {
      if (!c.visible_user_id.includes(user._id)) {
        return null;
      }
      return (
        <div
          key={c.message}
          className="bg-white border divide-y rounded select-text cursor-text"
        >
          <p className="flex flex-wrap px-2 py-1 text-sm">
            {`${c.commenter_id.name} ${formatDistance(
              new Date(c.date),
              new Date(),
              { addSuffix: true },
            )}`}
          </p>
          <p className="px-2 py-1 font-medium">{c.message}</p>
        </div>
      );
    });
    return divs;
  };

  const getOptions = () => {
    let ids;
    if (thisThread) {
      ids = thisThread.comments[0].visible_user_id;
    } else if (mode === ReviewMode.View) {
      ids = [user._id, reviewedPlan.user_id];
    } else if (mode === undefined || mode === ReviewMode.None) {
      ids = [];
      const reviewers = plan.reviewers;
      if (reviewers === undefined) return [];
      for (const r of reviewers) {
        ids.push(r.reviewer_id._id);
      }
    }
    let options = [];
    for (const s of ids) {
      options.push({ value: s, label: s });
    }
    return options;
  };

  return (
    <div
      className={clsx('absolute w-[30rem] h-12 cursor-default', {
        '-left-px w-[15rem]': left,
        'pl-60': !left,
      })}
      ref={wrapperRef}
    >
      {expanded ? (
        <div
          className="fixed top-0 left-0 z-30 w-screen h-screen"
          onClick={() => setExpanded(false)}
        />
      ) : null}
      {expanded ? (
        <div className="w-[300px] relative z-50 flex flex-col gap-2 p-2 border rounded shadow cursor-default bg-slate-100">
          <div className="flex flex-col gap-1.5">{getComments()}</div>
          {!thisThread && <div className="font-semibold">Add a Comment</div>}
          <div className="flex flex-col w-full">
            <form onSubmit={submitReply} className="flex-grow">
              <textarea
                value={replyText}
                onChange={handleChange}
                placeholder="Add a reply..."
                className="w-full px-2 py-1 border rounded outline-none"
                rows={3}
                autoFocus
              />
            </form>
            <div className="flex justify-between h-6">
              <Select
                // styles={{ height: '24px' }}
                options={getOptions()}
                isMulti={true}
                className="h-6"
              />
              <div
                className="flex items-center justify-center gap-1 text-sm transition-colors duration-150 ease-in transform rounded cursor-pointer hover:text-sky-600"
                onClick={submitReply}
              >
                <span>Send</span>
                <PaperAirplaneIcon className="w-4 h-4 rotate-90" />
              </div>
            </div>
          </div>
        </div>
      ) : thisThread ? (
        <ChatAlt2Icon
          className="absolute z-0 w-4 h-4 mt-2 text-black transition duration-150 ease-in transform rounded-md outline-none cursor-pointer stroke-2 hover:scale-110"
          onClick={() => setExpanded(true)}
        />
      ) : hovered ? (
        <AnnotationIcon
          className="absolute z-0 w-4 h-4 mt-2 text-black transition duration-150 ease-in transform rounded-md outline-none cursor-pointer stroke-2 hover:scale-110"
          onClick={() => setExpanded(true)}
        />
      ) : null}
    </div>
  );
};

export default Comments;
