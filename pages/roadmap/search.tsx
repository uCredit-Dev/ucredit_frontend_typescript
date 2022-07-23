import SearchHeader from "../../lib/components/roadmap/searchHeader";
import SearchDetailPane from "../../lib/components/roadmap/searchDetailPane";
import SearchResultCard from "../../lib/components/roadmap/searchResultCard";
import axios, { AxiosResponse } from 'axios';

const BASE_URL = 'http://localhost:4567';

const planArray : {
  id: string,
  planName: string,
  uploadDate: string,
  content: string,
  tagsList: string[],
  watchNum: number,
  likeNum: number,
  starNum: number,
  commentNum: number,
}[] = [];

const fetchPlanById = (id) => {
  axios({
    method: 'GET',
    url: BASE_URL + '/api/roadmapPlans/get/' + id,
  }).then((res: AxiosResponse) => {
    console.log('res: ', res.data.data);
    let plan = {
      id: res.data.data._id,
      planName: res.data.data.name,
      uploadDate: res.data.data.postedAt.substring(0, 10),
      content: res.data.data.description,
      tagsList: res.data.data.tags,
      watchNum: 1,
      likeNum: res.data.data.num_likes,
      starNum: 1,
      commentNum: 1
    }
    planArray.push(plan);
  }).catch((err: any) => {
    console.log('err: ', err);
  })
};

fetchPlanById("62d884c75b6fb8734aa09670");
fetchPlanById("62d887285b6fb8734aa09676");
fetchPlanById("62d8875b5b6fb8734aa09679");
fetchPlanById("62d888b15b6fb8734aa0967c");

const RoadmapSearch: React.FC = () => {
  return (
    <>
      <SearchHeader/>
      <div className="flex flex-col md:flex-row bg-white">
        <div className="hidden md:block basis-2/5">
          <div className="sticky top-44">
            <SearchDetailPane/>
          </div>
        </div>
        <div className="md:basis-3/5">
          {planArray.map((item) => {
            return (<SearchResultCard
                id={item.id}
                planName={item.planName}
                uploadDate={item.uploadDate}
                content={item.content}
                tagsList={item.tagsList}
                watchNum={item.watchNum}
                likeNum={item.likeNum}
                starNum={item.starNum}
                commentNum={item.commentNum}
            />);
          })}
        </div>
      </div>
    </>
  );
};

export default RoadmapSearch;