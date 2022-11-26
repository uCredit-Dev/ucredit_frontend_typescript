import SearchHeader from '../../lib/components/roadmap/search/SearchHeader';
import SearchDetailPane from '../../lib/components/roadmap/search/SearchDetailPane';
import SearchResultCard from '../../lib/components/roadmap/search/SearchResultCard';
import React from 'react';
import { Hoverable } from '../../lib/components/utils';
import { TooltipPrimary } from '../../lib/components/utils/TooltipPrimary';
import { StatusPlan } from '../../lib/resources/commonTypes';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
// import { selectPlan } from '../../lib/slices/currentPlanSlice';
import axios, { AxiosResponse } from 'axios';
import {
  selectSearchText,
  selectSearchTagsText,
  selectSearchMajorText,
} from '../../lib/slices/roadmapSearchSlice';

const BASE_URL = 'http://localhost:4567';

const planArray: {
  id: string;
  planName: string;
  uploadDate: string;
  content: string;
  tagsList: string[];
  majorList: string[];
  watchNum: number;
  likeNum: number;
  starNum: number;
  commentNum: number;
}[] = [];

const fetchPlanById = (id) => {
  axios({
    method: 'GET',
    url: BASE_URL + '/api/roadmapPlans/get/' + id,
  })
    .then((res: AxiosResponse) => {
      let plan = {
        id: res.data.data._id,
        planName: res.data.data.name,
        uploadDate: res.data.data.postedAt.substring(0, 10),
        content: res.data.data.description,
        tagsList: res.data.data.tags,
        majorList: res.data.data.major_ids,
        watchNum: 1,
        likeNum: res.data.data.num_likes,
        starNum: 1,
        commentNum: 1,
      };
      planArray.push(plan);
    })
    .catch((err: any) => {
      console.log('err: ', err);
    });
};

fetchPlanById('62d884c75b6fb8734aa09670');
fetchPlanById('62d887285b6fb8734aa09676');
fetchPlanById('62d8875b5b6fb8734aa09679');
fetchPlanById('62d888b15b6fb8734aa0967c');
fetchPlanById('62df1485ef87259b7ec48469');
fetchPlanById('62df150aab21329bcbd2707b');

interface Props {
  plans: StatusPlan[];
  expanded?: boolean;
}

const RoadmapSearch: React.FC<Props> = ({ plans, expanded = true }) => {
  // const [showPlans, setShowPlans] = useState(expanded);
  // const [mode, setMode] = useState<ReviewMode>(ReviewMode.None);
  const router = useRouter();
  const handleViewPlan = async (e, plan_id) => {
    // setMode(ReviewMode.RoadMap);
    // hardcoded for now
    const planID = '61ccac7bfd08a30004b0417c';
    router.push(`/dashboard?plan=${planID}&mode=roadmap`);
    // router.push(`/dashboard?plan=${plan_id}&mode=roadmap`);
  };

  // const currPlan = useSelector(selectPlan);
  const searchKeyword = useSelector(selectSearchText);
  const searchTagsKeyword = useSelector(selectSearchTagsText);
  const searchMajorKeyword = useSelector(selectSearchMajorText);

  const matchWithTitle = (plan) => {
    if (
      plan.planName.includes(searchKeyword) ||
      plan.content.includes(searchKeyword)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const matchWithTags = (plan) => {
    for (let tagName of plan.tagsList) {
      if (tagName.includes(searchTagsKeyword)) {
        return true;
      }
    }
    return false;
  };

  const matchWithMajor = (plan) => {
    for (let majorName of plan.majorList) {
      if (majorName.includes(searchMajorKeyword)) {
        return true;
      }
    }
    return false;
  };

  return (
    <>
      <SearchHeader />
      <div className="flex flex-col md:flex-row bg-white">
        <div className="hidden md:block basis-2/5">
          <div className="sticky top-44">
            <SearchDetailPane />
          </div>
        </div>

        {/* {showPlans && ( */}
        <div className="">
          {planArray
            .filter(matchWithTitle)
            .filter(matchWithTags)
            .filter(matchWithMajor)
            .map((item, i) => (
              <div key={item.id}>
                <Hoverable
                  as={
                    <div
                      className="transition-colors duration-150 ease-in rounded-sm cursor-pointer inspect-plan-button"
                      onClick={(e) => handleViewPlan(e, item.id)}
                    >
                      <SearchResultCard
                        id={item.id}
                        planName={item.planName}
                        uploadDate={item.uploadDate}
                        content={item.content}
                        tagsList={item.tagsList}
                        watchNum={item.watchNum}
                        likeNum={item.likeNum}
                        starNum={item.starNum}
                        commentNum={item.commentNum}
                      />
                    </div>
                  }
                >
                  {({ hovered }) => (
                    <>
                      {hovered && (
                        <TooltipPrimary width={120}>
                          Inspect plan
                        </TooltipPrimary>
                      )}
                    </>
                  )}
                </Hoverable>
              </div>
            ))}
        </div>
        {/* )} */}
      </div>
    </>
  );
};

export default RoadmapSearch;
