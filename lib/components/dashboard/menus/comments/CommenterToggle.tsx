import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectThreads,
  updateFilteredThreads,
} from '../../../../slices/currentPlanSlice';
import { selectCommenters } from '../../../../slices/userSlice';
import { Selectable } from '@robertz65/lyte';

interface Props {
  className?: string;
}

const CommenterToggle: React.FC<Props> = ({ className = '' }) => {
  const commenters = useSelector(selectCommenters);
  const threads = useSelector(selectThreads);
  const [selectedCommenters, setSelectedCommenters] = useState(
    commenters.map(({ _id, name }) => ({ label: _id, content: name })),
  );
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
          (c) => c.commenter_id._id === label,
        );
        for (const comment of filteredComment) {
          filteredComments.set(comment._id, comment);
        }
      }
      const newValue = JSON.parse(JSON.stringify(value));
      (newValue as any).comments = Array.from(filteredComments.values());
      filtered.set(key, newValue);
    }
    console.log("(CommenterToggle) updateFilteredThreads: ", filtered);
    dispatch(updateFilteredThreads(filtered));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threads, selectedCommenters]);

  return (
    <div className={className}>
      {commenters.length ? (
        <Selectable
          width="100%"
          allowClear={true}
          allowRefill={true}
          className="bg-white"
          multi={true}
          options={commenters.map(({ _id, name }) => ({
            label: _id,
            content: name,
          }))}
          defaultValue={selectedCommenters.map(({ label }) => label)}
          onChange={(values) => setSelectedCommenters(values as any)}
        />
      ) : null}
    </div>
  );
};

export default CommenterToggle;
