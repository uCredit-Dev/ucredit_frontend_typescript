import React from 'react';
import {
  AiOutlineComment,
  AiFillEye,
  AiOutlineLike,
  AiOutlineStar,
} from 'react-icons/ai';
//import {Avatar, Badge, Card, Divider, Tag} from "antd";

// The parameter (planInfo) remains to be filled.
// The input planInfo should at least include to be rendered:
// "planName,
// planId,
// uploadDate,
// tagsList[] (each tag should have a name and corresponding color),
// content,
// watchNum,
// likeNum,
// starNum,
// commentNum".

type planCardProps = {
  id: string,
  planName: string,
  uploadDate: string,
  content: string,
  tagsList: string[],
  watchNum: number,
  likeNum: number,
  starNum: number,
  commentNum: number
}

const SearchResultCard: React.FC<planCardProps> = (props) => {
  return (
    <div className="bg-blue-200 mx-5 mt-5 mb-5 rounded-2xl">
      <div
        className={
          'flex flex-row'
          /*`grid grid-cols-2 gap-4 place-content-between h-20`*/
        }
      >
        {/*title*/}
        <div className="grow">
          <h1 className="text-4xl flex-grow-0 mx-5 pt-3 pb-1 font-semibold">
            {' '}
            {props.planName}{' '}
          </h1>
        </div>
        <div>
          <div className="flex justify-end mx-5 pt-3 pb-1">
            {/*Date*/}
            <div>
              <p>
                <span className="hidden lg:inline">Uploaded on </span>{props.uploadDate}
              </p>
            </div>
          </div>

          {/*watchNum*/}
          <div className="flex justify-end mx-5 pt-3 pb-1">
            <button className="flex-grow-0 pb-1bg-blue-900">
              <div className="flex flex-row items-center">
                <AiFillEye />
                <p>{props.watchNum}</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/*tagsList*/}
      <div className="flex flex-row">
      {props.tagsList.map((item, index) => {
        let reminder = index % 5;
        let className = "flex-grow-0 mx-2 px-3 pt-0.5 pb-1 rounded-3xl text-blue ";
        if (reminder === 0){
          className += "bg-yellow-300";
        }
        else if (reminder === 1){
          className += "bg-pink-300";
        }
        else if (reminder === 2){
          className += "bg-blue-300";
        }
        else if (reminder === 3){
          className += "bg-purple-300";
        }
        else {
          className += "bg-green-300";
        }
        return (
          <div>
            <a className={className}>
              {item}
            </a>
          </div>);
      })}
      </div>

      {/*Contents*/}
      <div className="flex-grow-0 mx-2 px-3 pt-3 pb-3">
        <p className="flex-grow font-semibold text-left max-h-12 overflow-y-hidden">
          {props.content}
        </p>
      </div>

      <div className="flex justify-end pb-1">
        {/*Stars*/}
        <a href="/" className="flex-grow-0 mx-2 px-3 pt-0.5">
          <div className="flex flex-row items-center h-full">
            <AiOutlineStar />
          </div>
        </a>
        {/*Likes*/}
        <a href="/" className="flex-grow-0 mx-2 px-3 pt-0.5">
          <div className="flex flex-row items-center">
            <AiOutlineLike />
            <p>{props.likeNum}</p>
          </div>
        </a>
        {/*Comments*/}
        <a href="/" className="flex-grow-0 mx-2 px-3 pt-0.5">
          <div className="flex flex-row items-center">
            <AiOutlineComment />
            <p>{props.commentNum}</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default SearchResultCard;
