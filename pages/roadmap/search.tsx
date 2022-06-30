import SearchHeader from "../../lib/components/roadmap/searchHeader";
import SearchDetailPane from "../../lib/components/roadmap/searchDetailPane";
import SearchResultCard from "../../lib/components/roadmap/searchResultCard";
import { useState } from "react";

const RoadmapSearch: React.FC = () => {
  const [advToolsClass, setAdvToolsClass] = useState("hidden");

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