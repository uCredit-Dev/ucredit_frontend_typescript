import React, { FC } from 'react';

const NewComment: FC = () => {
  return (
    <div className="mx-16 h-[165px] rounded-[20px] w-[93%] border-2 mt-5 px-10 py-6">
      <textarea
        className=" w-full h-[80px]"
        placeholder="comment here"
      ></textarea>
      <button className="w-[75px] h-[32px] rounded-[100px] bg-[#0C3A76] text-white">
        {' '}
        submit{' '}
      </button>
    </div>
  );
};

export default NewComment;
