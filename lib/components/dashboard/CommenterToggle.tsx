import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectThreads,
  updateFilteredThreads,
} from '../../slices/currentPlanSlice';
import { selectCommenters } from '../../slices/userSlice';
import Dropdown from '../reviewer/Dropdown';

interface Props {
  // commenters: UserId[];
}

const CommenterToggle: React.FC<Props> = () => {
  const commenters = useSelector(selectCommenters);
  const threads = useSelector(selectThreads);
  // const commenters = [
  //   { name: 'test', _id: 'test' },
  //   { name: 'test2', _id: 'test2' },
  // ];
  const [selectedCommenters, setSelectedCommenters] = useState([]);
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
      const { comments } = value as any;
      const newComments = [];
      for (const { label } of selectedCommenters) {
        newComments.push(
          comments.filter((c) => c.commenter_id._id === label)[0],
        );
      }
      const newValue = JSON.parse(JSON.stringify(value));
      (newValue as any).comments = newComments;
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
          options={commenters.map(({ name, _id }) => ({
            label: _id,
            content: name,
          }))}
          _default={commenters.map(({ _id }) => _id)}
          onChange={(values) => setSelectedCommenters(values)}
        />
      ) : null}
    </div>
  );
};

export default CommenterToggle;
