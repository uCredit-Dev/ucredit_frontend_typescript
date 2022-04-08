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
      dispatch(updateCurrentComment([temp.data, location]));
      setReplyText('');
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
      dispatch(updateThreads([...threads.values(), temp.data]));
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
      if (!c.visible_user_id.includes(user._id)) {
        return null;
      }
      return (
        <div key={c.message}>
          <div className="z-30 font-bold">
            {c.commenter_id.name + ' - ' + getDate(new Date(c.date))}
          </div>
          <div>{c.message}</div>
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
          className="fixed w-screen h-screen top-0 left-0 z-30"
          onClick={() => setExpanded(false)}
        />
      ) : null}
      {expanded ? (
        <div className="relative bg-gray-100 rounded border shadow p-2 z-50 cursor-default">
          <div className="flex flex-col">{getComments()}</div>
          {!thisThread && <div className="font-bold">Add a Comment</div>}
          <div className="pt-2 flex flex-row items-center w-full">
            <form onSubmit={submitReply} className="flex-grow">
              <textarea
                value={replyText}
                onChange={handleChange}
                placeholder="Add a reply..."
                className="w-full px-2"
                rows={3}
                autoFocus
              />
            </form>
            <div
              className="rotate-90 ml-2 h-4 w-4 transform hover:scale-110 hover:cursor-pointer"
              onClick={submitReply}
            >
              <PaperAirplaneIcon />
            </div>
          </div>
          <div>
            <Select options={getOptions()} isMulti={true} />
          </div>
        </div>
      ) : thisThread ? (
        <ChatAlt2Icon
          className="z-0 mt-2 absolute w-4 h-4 text-black rounded-md outline-none stroke-2 cursor-pointer transform hover:scale-110 transition duration-150 ease-in"
          onClick={() => setExpanded(true)}
        />
      ) : hovered ? (
        <AnnotationIcon
          className="z-0 mt-2 absolute w-4 h-4 text-black rounded-md outline-none stroke-2 cursor-pointer transform hover:scale-110 transition duration-150 ease-in"
          onClick={() => setExpanded(true)}
        />
      ) : null}
    </div>
  );
};

export default Comments;
