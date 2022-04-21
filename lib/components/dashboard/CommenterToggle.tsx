import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectThreads,
  updateFilteredThreads,
} from '../../slices/currentPlanSlice';
import { selectCommenters, selectUser } from '../../slices/userSlice';
import Dropdown from '../reviewer/Dropdown';

interface Props {
  // commenters: UserId[];
}

const CommenterToggle: React.FC<Props> = () => {
  const commenters = useSelector(selectCommenters);
  const threads = useSelector(selectThreads);
  const [selectedCommenters, setSelectedCommenters] = useState(
    commenters.map(({ _id, name }) => ({ label: _id, content: name })),
  );
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    setSelectedCommenters(
      commenters.map(({ _id, name }) => ({ label: _id, content: name })),
    );
  }, [commenters]);

  useEffect(() => {
    if (!threads || !selectCommenters) return;
    const filtered = new Map();
    for (const [key, value] of Object.entries(threads)) {
      const filteredComments = new Map();
      const { comments } = value as any;
      for (const { label } of selectedCommenters) {
        const filteredComment = comments.filter(
          (c) =>
            c.commenter_id._id === label || c.commenter_id._id === user._id,
        );
        for (const comment of filteredComment) {
          filteredComments.set(comment._id, comment);
        }
      }
      const newValue = JSON.parse(JSON.stringify(value));
      (newValue as any).comments = Array.from(filteredComments.values());
      filtered.set(key, newValue);
    }
    dispatch(updateFilteredThreads(filtered));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threads, selectedCommenters]);

  return (
    <div className="px-[100px] my-2">
      {commenters.length ? (
        <Dropdown
          width={200}
          multi={true}
          options={commenters.map(({ _id, name }) => ({
            label: _id,
            content: name,
          }))}
          _default={selectedCommenters.map(({ label }) => label)}
          onChange={(values) => setSelectedCommenters(values)}
        />
      ) : null}
    </div>
  );
};

export default CommenterToggle;
