import React from 'react';
import Star from './assets/Star.svg';
import Like from './assets/Like.svg';
import View from './assets/View.svg';
import axios from 'axios';
import { getAPI } from './../../resources/assets';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectPlan } from '../../slices/currentPlanSlice';

const Laptop: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [likes, setLikes] = useState<number>(0);
  const [postDate, setPostDate] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [views, setViews] = useState<number>(0);
  const [userID, setUserID] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);

  const currPlan = useSelector(selectPlan);

  useEffect(() => {
    axios
      .get(getAPI(window) + `/roadmapPlans/get/${'62d8875b5b6fb8734aa09679'}`)

      .then((response) => {
        setName(response.data.data.name);
        setUserID(response.data.data.user_id);
        setLikes(response.data.data.num_likes);
        setViews(response.data.data.num_likes);
        setPostDate(response.data.data.postedAt.substring(0, 10));
        setDesc(response.data.data.description);
        setTags(response.data.data.tags);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currPlan._id]);

  return (
    <>
      <div className="flex bg-sky-100 items-stretch w-full">
        <div className="mx-32 my-9 text-left">
          <div className="flex flex-row">
            {/* plan Name */}
            <div className="flex flex-row text-3xl sm: md: lg: xl: xxxl: ">
              {name}
              <div className="flex flex-row ml-8 text-xl">
                {/*Stars*/}
                <button className="flex items-center mx-2 px-3">
                  <Star />
                </button>

                {/*Likes*/}
                <button className="flex items-center mx-2 px-3">
                  <Like />
                  <p className="ml-2">{likes}</p>
                </button>

                {/*Comments*/}
                <div className="flex items-center mx-2 px-3">
                  <View />
                  <p className="ml-2">{views}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row">
            {/* author */}
            <div className="text-sm mt-3 sm: md: lg: xl: ">by {userID}</div>
            {/*tagsList*/}
            <div className="flex flex-row ml-64 mt-2">
              {tags.map((tag) => (
                <div key={tag}>
                  <button
                    key={tag}
                    className="flex-grow-0 mx-2 px-3 pt-0.5 pb-1 rounded-3xl text-blue bg-yellow-tag"
                  >
                    {tag}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* date */}
          <div className="text-sm mb-4 sm: md: lg: xl: ">
            uploaded on {postDate}
          </div>
          <div className="text-sm sm: md: lg: xl: ">{desc}</div>
        </div>
      </div>
    </>
  );
};

const Banner: React.FC = () => {
  return (
    <>
      <Laptop />
    </>
  );
};

export default Banner;
