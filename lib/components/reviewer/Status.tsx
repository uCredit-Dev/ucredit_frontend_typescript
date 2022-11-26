import clsx from 'clsx';
import { Dispatch, SetStateAction } from 'react';
import { statusReadable } from '../../../pages/reviewer';
import { ReviewRequestStatus } from '../../resources/commonTypes';

interface Props {
  status: ReviewRequestStatus;
  selected: boolean;
  setSelected: Dispatch<SetStateAction<boolean>>;
}

const Status: React.FC<Props> = ({ status, selected, setSelected }) => {
  return (
    <button
      onClick={() => setSelected((selected) => !selected)}
      className={clsx('px-1 text-sm font-medium text-white rounded', {
        'bg-sky-400': selected && status === ReviewRequestStatus.UnderReview,
        'bg-emerald-400': selected && status === ReviewRequestStatus.Approved,
        'bg-red-400': selected && status === ReviewRequestStatus.Rejected,
        'bg-slate-300': !selected,
      })}
    >
      {statusReadable[status]}
    </button>
  );
};

export default Status;
