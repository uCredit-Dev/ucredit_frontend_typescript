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
        {/* The bg color and height can be removed when the SearchResultCard
        components are added (they're just for testing/layout purposes) */}

        <div className="basis-3/5 [120vh]">
          {/*Search Results*/}
          {/* List of SearchResultCard components goes here */}
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