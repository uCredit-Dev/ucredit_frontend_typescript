import SearchHeader from "../../lib/components/roadmap/searchHeader";
import SearchDetailPane from "../../lib/components/roadmap/searchDetailPane";

const RoadmapSearch: React.FC = () => {
  return (
    <>
      <SearchHeader/>
      <div className="flex flex-row">
        <div className="basis-2/5 bg-violet-300">
          <SearchDetailPane/>
        </div>
        <div className="basis-3/5 bg-blue-300 h-[120vh]">
          Search Results
          {/* List of SearchResultCard components goes here */}
        </div>
      </div>
    </>
  );
}

export default RoadmapSearch;