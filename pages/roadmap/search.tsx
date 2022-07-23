import SearchHeader from '../../lib/components/roadmap/search/SearchHeader';
import SearchDetailPane from '../../lib/components/roadmap/search/SearchDetailPane';
import SearchResultCard from '../../lib/components/roadmap/search/SearchResultCard';
import React from 'react';

const RoadmapSearch: React.FC = () => {
  return (
    <>
      <SearchHeader />
      <div className="flex flex-col md:flex-row bg-white">
        <div className="hidden md:block basis-2/5">
          <div className="sticky top-44">
            <SearchDetailPane />
          </div>
        </div>
        <div className="md:basis-3/5">
          <SearchResultCard />
          <SearchResultCard />
          <SearchResultCard />
          <SearchResultCard />
        </div>
      </div>
    </>
  );
};

export default RoadmapSearch;
