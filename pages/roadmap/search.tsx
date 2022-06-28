import SearchHeader from "../../lib/components/roadmap/searchHeader";
import SearchDetailPane from "../../lib/components/roadmap/searchDetailPane";
import SearchResultCard from "../../lib/components/roadmap/searchResultCard";

const RoadmapSearch: React.FC = () => {
  return (
    <>
      <SearchHeader/>
      <div className="flex flex-row bg-white">
        <div className="basis-2/5">
          <SearchDetailPane/>
        </div>
        <div className="basis-3/5">
          <SearchResultCard/>
          <SearchResultCard/>
          <SearchResultCard/>
          <SearchResultCard/>
        </div>
      </div>
    </>
  );
}

export default RoadmapSearch;