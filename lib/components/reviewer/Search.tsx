import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { DotsVerticalIcon } from '@heroicons/react/outline';
import { RevieweePlans } from '../../../lib/resources/commonTypes';

const Search: React.FC<{
  revieweePlans: RevieweePlans[];
  setFiltered: Dispatch<SetStateAction<RevieweePlans[]>>;
}> = ({ revieweePlans, setFiltered }) => {
  const [searchState, updateSearchState] = useState('');
  const [displaySettings, setDisplaySettings] = useState(false);
  const settings = [
    'Recently Updated',
    'First Name',
    'Last Name',
    'JHED',
    'Graduation Year',
  ];
  const years = {
    Freshman: 1,
    Sophomore: 2,
    Junior: 3,
    Senior: 4,
  };
  const [searchSetting, setSearchSetting] = useState(settings[0]);

  const handleChange = (e) => {
    updateSearchState(e.target.value);
  };

  const filter = () => {
    let filteredMap = new Map();
    for (const { reviewee, plans } of revieweePlans) {
      for (const plan of plans) {
        if (
          plan._id.includes(searchState) ||
          plan.name.includes(searchState) ||
          reviewee.name.includes(searchState)
        ) {
          const filteredPlans = filteredMap.get(reviewee) || [];
          filteredMap.set(reviewee, [...filteredPlans, plan]);
        }
      }
    }
    const filtered: RevieweePlans[] = [];
    for (const [k, v] of filteredMap) filtered.push({ reviewee: k, plans: v });
    switch (searchSetting) {
      case 'Recently Updated':
        // TODO
        break;
      case 'First Name':
        filtered.sort((a, b) => a.reviewee.name.localeCompare(b.reviewee.name));
        break;
      case 'Last Name':
        filtered.sort((a, b) =>
          a.reviewee.name
            .split(' ')[1]
            .localeCompare(b.reviewee.name.split(' ')[1]),
        );
        break;
      case 'JHED':
        filtered.sort((a, b) => a.reviewee._id.localeCompare(b.reviewee._id));
        break;
      case 'Graduation Year':
        filtered.sort(
          (a, b) =>
            years[b.reviewee.grade.split(' ')[2]] -
            years[a.reviewee.grade.split(' ')[2]],
        );
        break;
      default:
    }
    setFiltered(filtered);
  };

  useEffect(() => {
    if (searchState.length > 2) {
      const search = setTimeout(() => filter(), 500);
      return () => clearTimeout(search);
    } else setFiltered(revieweePlans);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchState, searchSetting, revieweePlans]);

  return (
    <div className="flex flex-row items-center">
      <input
        className="w-full h-8 px-2 bg-white border border-gray-300 rounded-md outline-none grow"
        placeholder="Search for a reviewee..."
        value={searchState}
        onChange={handleChange}
      />
      <div>
        <DotsVerticalIcon
          className="w-6 h-6 my-1 -ml-6"
          onClick={() => setDisplaySettings(!displaySettings)}
        />
        {displaySettings ? (
          <div className="absolute flex flex-col items-start p-3 -translate-x-full bg-white border rounded shadow">
            <div>
              <p>Sort By:</p>
            </div>
            {settings.map((setting) => (
              <div
                className="flex flex-row hover:cursor-pointer"
                onClick={() => setSearchSetting(setting)}
              >
                {searchSetting === setting ? (
                  <img
                    src={'svg/Check.svg'}
                    alt="status"
                    className="block h-4 m-auto mt-1 mr-1 tooltip"
                    data-tip="Pending"
                  />
                ) : (
                  <img
                    src={'svg/Star.svg'}
                    alt="status"
                    className="block h-4 m-auto mt-1 mr-1 tooltip"
                    data-tip="Pending"
                  />
                )}
                <div>
                  <p>{setting}</p>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export { Search };
