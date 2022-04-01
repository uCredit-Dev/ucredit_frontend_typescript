import { FC } from 'react';
import { PlusIcon } from '@heroicons/react/outline';

const Comments: FC<{
  location: string;
}> = ({ location }) => {
  const addComment = () => {
    console.log(location);
  };

  return (
    <div>
      <PlusIcon
        className="z-20 -ml-4 mt-2 absolute w-4 h-4 text-black rounded-md outline-none stroke-2 cursor-pointer transform hover:scale-110 transition duration-150 ease-in"
        onClick={addComment}
      />
    </div>
  );
};

export default Comments;
