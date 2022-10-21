import React, { FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  PaperAirplaneIcon,
  AnnotationIcon,
  ChatAlt2Icon,
  TrashIcon,
} from '@heroicons/react/outline';
import clsx from 'clsx';
import { formatDistanceToNow } from 'date-fns';
import {
  CommentType,
  ReviewMode,
  ThreadType,
} from '../../resources/commonTypes';
import {
  selectFilteredThreads,
  selectPlan,
  selectReviewedPlan,
  selectSelectedThread,
  updateCurrentComment,
  updateSelectedThread,
  updateThreads,
} from '../../slices/currentPlanSlice';
import { userService } from '../../services';
import {
  selectCommenters,
  selectToken,
  selectUser,
  updateCommenters,
} from '../../slices/userSlice';

const Comments: FC<{
  location: string;
  hovered: boolean;
  mode: ReviewMode;
  left?: boolean;
}> = ({ location, hovered }) => {
  const [expanded, setExpanded] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [thisThread, setThisThread] = useState<ThreadType | null>(null);
  const dispatch = useDispatch();
  const threads = useSelector(selectFilteredThreads); // threads filtered by commenter toggle
  const user = useSelector(selectUser);
  const plan = useSelector(selectPlan);
  const reviewedPlan = useSelector(selectReviewedPlan);
  const selectedThread = useSelector(selectSelectedThread);
  const commenters = useSelector(selectCommenters);
  const token = useSelector(selectToken);
  let wrapperRef = useRef(null);
  const [comments, setComments] = useState<JSX.Element[]>([]);
  // const [visibleUsers, setVisibleUsers] = useState<String[]>([]);

  useEffect(() => {
    if (selectedThread === location) {
      setExpanded(true);
      dispatch(updateSelectedThread(''));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedThread]);

  useEffect(() => {
    if (threads[location]) {
      setThisThread(threads[location]);
      const commentsJSX = getComments(threads[location]);
      setComments(commentsJSX.filter((el) => el !== null));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threads]);

  const handleChange = (e) => {
    setReplyText(e.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        !expanded ||
        // @ts-ignore: property does not exist error
        (typeof e.target.className === 'string' &&
          // @ts-ignore: property does not exist error
          e.target.className.includes('option')) ||
        // @ts-ignore: property does not exist error
        e.target.tagName === 'svg' ||
        // @ts-ignore: property does not exist error
        e.target.tagName === 'path' ||
        // @ts-ignore: property does not exist error
        (e.target.tagName === 'DIV' && e.target.className.includes('css'))
      )
        return;
      const currentWrapperRef: any = wrapperRef.current;
      if (currentWrapperRef && !currentWrapperRef.contains(e.target))
        setExpanded(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [wrapperRef, expanded]);

  const submitReply = async (e) => {
    e.preventDefault();
    if (replyText === '') {
      return;
    }
    const planToAdd = reviewedPlan ? reviewedPlan : plan;
    // visibleUsers.push(user._id);
    // if (planToAdd.user_id !== user._id) visibleUsers.push(planToAdd.user_id);
    const visibleUsersBody = plan.reviewers.map(
      (reviewer) => reviewer.reviewer_id._id,
    );
    visibleUsersBody.push(user._id);
    if (planToAdd.user_id !== user._id)
      visibleUsersBody.push(planToAdd.user_id);
    //= [...visibleUsers];
    if (thisThread) {
      const body = {
        comment: {
          commenter_id: user._id,
          visible_user_id: visibleUsersBody,
          thread_id: thisThread._id,
          message: replyText,
          date: new Date(),
        },
      };
      const temp = await userService.postNewComment(body, token);
      const newComment = temp.data;
      const commenter = {
        _id: user._id,
        name: user.name,
      };
      newComment.commenter_id = commenter;
      const newCommenters = [...commenters];
      if (!newCommenters.find((c) => c._id === commenter._id))
        newCommenters.push(commenter);
      dispatch(updateCommenters(newCommenters));
      dispatch(updateCurrentComment([newComment, location]));
      setReplyText('');
    } else {
      const data = {
        thread: {
          plan_id: planToAdd._id,
          location_type: location.split(' ')[0],
          location_id: location.split(' ')[1],
          resolved: false,
        },
        comment: {
          commenter_id: user._id,
          visible_user_id: visibleUsersBody,
          message: replyText,
          date: new Date(),
        },
      };
      const temp = await userService.postNewThread(data, token);
      JSON.parse(JSON.stringify(threads));
      let threadCopy = JSON.parse(JSON.stringify(threads));
      threadCopy[location] = temp.data;
      threadCopy[location].comments[0].commenter_id = {
        _id: user._id,
        name: user.name,
      };
      dispatch(updateThreads(Object.values(threadCopy)));
      setThisThread(threadCopy[location]);
      setReplyText('');
    }
  };

  const getComments = (thisThread): JSX.Element[] => {
    if (!thisThread) return [];
    const divs = thisThread.comments.map((c: CommentType) => {
      // if (!c.visible_user_id.includes(user._id)) {
      //   return null;
      // }
      return (
        <div
          key={c._id}
          className="bg-white divide-y rounded select-text cursor-text"
        >
          <div className="flex items-center justify-between w-full px-2 py-1 text-sm">
            <p className="w-[50%] font-medium truncate">
              {c.commenter_id.name}
            </p>
            <p className="text-xs truncate">
              {formatDistanceToNow(new Date(c.date), {
                addSuffix: true,
              })}
            </p>
            {c.commenter_id._id === user._id && (
              <button
                className="flex items-center justify-center w-6 h-6 transition-colors duration-150 ease-in rounded-sm cursor-pointer hover:bg-gray-200 inspect-plan-button"
                onClick={() => deleteHandler(c._id)}
              >
                <TrashIcon className="w-5 h-5 stroke-red-500" />
              </button>
            )}
          </div>
          <p className="px-2 py-1 border-top-1 border-slate-300">{c.message}</p>
        </div>
      );
    });
    return divs;
  };

  // TODO: Handle more elegantly
  // const getOptions = () => {
  //   let ids: string[] = [];
  //   if (thisThread) {
  //     // not being handled currently
  //     // if there are already comments here, we need to do one of the following
  //     // 1. if the user is the commenter, show all reviewers
  //     // 2. if the user is a reviewer, show the below
  //     //     a. if one of the comments contains the user, show the max of all the reviewers included in the comments
  //     //     b. if none of the comments contain the user, show only the user
  //     if (mode === ReviewMode.View) {
  //       thisThread.comments.forEach((comment) => {
  //         if (comment.visible_user_id.includes(user._id)) {
  //           comment.visible_user_id.forEach((uID) => {
  //             if (!ids.includes(uID)) ids = [...ids, uID];
  //           });
  //         }
  //       });
  //       if (ids.length === 0) {
  //         if (reviewedPlan && ReviewMode.View) ids.push(reviewedPlan.user_id);
  //         if (ReviewMode.Edit) ids.push(user._id);
  //       }
  //     } else {
  //       const reviewers = plan.reviewers;
  //       if (!reviewers) return [];
  //       for (const r of reviewers) {
  //         let reviewer: any = r;
  //         if (reviewer.status !== ReviewRequestStatus.Pending)
  //           ids.push(reviewer.reviewer_id._id);
  //       }
  //     }
  //   } else if (mode === ReviewMode.View) {
  //     ids = [user._id];
  //     if (reviewedPlan) ids.push(reviewedPlan.user_id);
  //   } else {
  //     const reviewers = plan.reviewers;
  //     if (reviewers === undefined) return [];
  //     for (const r of reviewers) {
  //       if (r.status !== ReviewRequestStatus.Pending)
  //         ids.push(r.reviewer_id._id);
  //     }
  //   }
  //   ids = ids.filter((el, i) => !ids.slice(i + 1, ids.length).includes(el));
  //   let options: { value: string; label: string }[] = [];
  //   for (const s of ids) {
  //     if (s !== user._id) options.push({ value: s, label: s });
  //   }
  //   return options;
  // };
  // const updateVisibleUsers = (event) => {
  //   setVisibleUsers(event.map((el) => el.value));
  // };

  const deleteHandler = async (key) => {
    setComments((prevState) => {
      const updatedState = prevState.filter((comment) => comment.key !== key);
      return updatedState;
    });
    try {
      let comment_id: string = '';
      const threads = await userService.getThreads(plan._id, token, false, null);
      for (let thread of threads.data.data) {
        for (let comment of thread.comments) {
          if (comment._id === key) {
            comment_id = comment._id;
            const commentIndex = thread.comments
              .map((e) => e._id)
              .indexOf(comment_id);
            thread.comments.splice(commentIndex, 1);
            dispatch(updateThreads(threads.data.data));
            break;
          }
        }
      }
      await userService.removeComment(comment_id, token);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={clsx('absolute z-50 h-12 cursor-default md:translate-x-60 ', {
        'translate-y-[12px]': location.split(' ')[0] === 'Course',
        '-left-[125px] translate-y-7': location.split(' ')[0] === 'Year',
        'z-0': !expanded && (hovered || thisThread),
      })}
    >
      {expanded ? (
        <div
          className="w-[300px] relative z-90 left-2 top-2 flex flex-col gap-2 p-2 rounded shadow cursor-default bg-slate-200"
          ref={wrapperRef}
        >
          {comments && comments.length ? (
            <div className="flex flex-col gap-1.5">{comments}</div>
          ) : null}
          {(!thisThread || !comments.length) && (
            <div className="font-semibold">Add a comment</div>
          )}
          <div className="flex flex-col w-full">
            <form onSubmit={submitReply} className="flex-grow">
              <textarea
                value={replyText}
                onChange={handleChange}
                placeholder="Add a reply..."
                className="w-full px-2 py-1 rounded outline-none"
                rows={3}
                autoFocus
              />
            </form>
            {/* <Select
              options={getOptions()}
              isMulti={true}
              onChange={updateVisibleUsers}
              className="select-reviewers-input"
            /> */}
            <div
              className="flex items-center self-end justify-center gap-1 mt-2 text-sm transition-colors duration-150 ease-in transform rounded cursor-pointer hover:text-sky-600"
              onClick={submitReply}
            >
              <span>Send</span>
              <PaperAirplaneIcon className="w-4 h-4 rotate-90" />
            </div>
          </div>
        </div>
      ) : thisThread && comments.length > 0 ? (
        <ChatAlt2Icon
          className="absolute z-0 w-4 h-4 mt-2 text-black transition duration-150 ease-in transform rounded-md outline-none cursor-pointer stroke-2 hover:scale-110 add-comment-button"
          onClick={() => setExpanded(true)}
        />
      ) : hovered ? (
        <AnnotationIcon
          className="absolute z-0 w-4 h-4 mt-2 text-black transition duration-150 ease-in transform rounded-md outline-none cursor-pointer stroke-2 hover:scale-110 add-comment-button"
          onClick={() => setExpanded(true)}
        />
      ) : null}
    </div>
  );
};

export default Comments;
