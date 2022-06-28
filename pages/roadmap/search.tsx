import SearchHeader from "../../lib/components/roadmap/searchHeader";
import SearchDetailPane from "../../lib/components/roadmap/searchDetailPane";
import SearchResultCard from "../../lib/components/roadmap/searchResultCard";
import { useState } from "react";

const RoadmapSearch: React.FC = () => {
  const [advToolsClass, setAdvToolsClass] = useState("hidden");

  const showAdvTools = () => {
    setAdvToolsClass("");
  }

  const hideAdvTools = () => {
    setAdvToolsClass("hidden");
  }

  const showToolsButtonClass = () => {
    if (advToolsClass === "hidden") {
      return "";
    } else {
      return "hidden";
    }
  }

  return (
    <>
      <SearchHeader/>
      <div className="flex flex-col md:flex-row bg-white">
        <div className="md:basis-2/5">
          <button className={`text-center underline text-blue-600
          w-full md:hidden ${showToolsButtonClass()}`} onClick={showAdvTools}>
            Show advanced search tools
          </button>
          <div className={`md:block md:sticky md:top-44 ${advToolsClass}`}>
            <button className="text-center underline 
            text-blue-600 w-full md:hidden" onClick={hideAdvTools}>
              Hide advanced search tools
            </button>
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