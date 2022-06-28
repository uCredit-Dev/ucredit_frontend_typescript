import React, {FC} from 'react';
import {AiOutlineComment, AiFillEye, AiOutlineLike, AiOutlineStar} from "react-icons/ai";
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

const SearchResultCard: React.FC = () => {
    return (
        <div className="bg-blue-200 mx-5 mt-5 mb-5 rounded-2xl">

            <div className="grid grid-cols-2 gap-4 place-content-between h-20 ...">
                {/*title*/}
                <div>
                    <h1 className="text-4xl flex-grow-0 mx-5 pt-3 pb-1 font-semibold"> Plan Name </h1>
                </div>

                <div>
                    <div className="flex justify-end mx-5 pt-3 pb-1">
                        {/*Date*/}
                        <div>
                            <p>Uploaded on 2022-06-04</p>
                        </div>
                    </div>

                    {/*watchNum*/}
                    <div className="flex justify-end mx-5 pt-3 pb-1">
                        <a className="flex-grow-0 pb-1bg-blue-900">
                            <div className="flex flex-row">
                                <AiFillEye/>
                                <p>324</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            {/*tagsList*/}
            <div className="flex flex-row">
                <div>
                    <a className="flex-grow-0 mx-2 px-3 pt-0.5 pb-1 rounded-3xl
        text-blue bg-yellow-300">
                        English
                    </a>
                </div>
                <div>
                    <a className="flex-grow-0 mx-2 px-3 pt-0.5 pb-1 rounded-3xl
        text-blue bg-green-300">
                        Humanity
                    </a>
                </div>

                <div>
                    <a className="flex-grow-0 mx-2 px-3 pt-0.5 pb-1 rounded-3xl
        text-blue bg-pink-300">
                        Pre-law
                    </a>
                </div>
            </div>

            {/*Contents*/}
            <div className="flex-grow-0 mx-2 px-3 pt-3 pb-3">
                <p className="flex-grow font-semibold text-left">a brief description of this plan,
                    such as the main purpose and concentration.
                    two lines of preview in total ...
                </p>
            </div>

            <div className="flex justify-end">
                {/*Stars*/}
                <a href="/" className="flex-grow-0 mx-2 px-3 pt-0.5 pb-1bg-blue-900">
                    <div className="flex flex-row">
                        <AiOutlineStar/>
                    </div>
                </a>
                {/*Likes*/}
                <a href="/" className="flex-grow-0 mx-2 px-3 pt-0.5 pb-1bg-blue-900">
                    <div className="flex flex-row">
                        <AiOutlineLike/>
                        <p>102</p>
                    </div>
                </a>
                {/*Comments*/}
                <a href="/" className="flex-grow-0 mx-2 px-3 pt-0.5 pb-1bg-blue-900">
                    <div className="flex flex-row">
                        <AiOutlineComment/>
                        <p>12</p>
                    </div>
                </a>
            </div>

        </div>
    );
}

export default SearchResultCard;