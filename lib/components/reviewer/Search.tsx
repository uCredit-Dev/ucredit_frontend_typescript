import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Plan } from '../../../lib/resources/commonTypes';
import { DotsVerticalIcon } from '@heroicons/react/outline';
import { planUserTuple } from '../../../pages/reviewer';

const Search: React.FC<{
  plans: planUserTuple[];
  setFiltered: Dispatch<SetStateAction<planUserTuple[]>>;
}> = ({ plans, setFiltered }) => {
  const [searchState, updateSearchState] = useState('');
  const [displaySettings, setDisplaySettings] = useState(false);
  const settings = [
    'Recently Updated',
    'First Name',
    'Last Name',
    'JHED',
    'Graduation Year',
  ];
  const [searchSetting, setSearchSetting] = useState(settings[0]);

  const handleChange = (e) => {
    updateSearchState(e.target.value);
  };

  const filter = () => {
    console.log('filtering');
    let filtered: planUserTuple[] = [];
    plans.forEach((tuple) => {
      if (
        tuple.plan._id.includes(searchState) ||
        tuple.plan.name.includes(searchState) ||
        tuple.user.name.includes(searchState)
      ) {
        filtered.push(tuple);
      }
    });
    switch (searchSetting) {
      case 'Recently Updated':
        // TODO
        break;
      case 'First Name':
        filtered.sort((a, b) => a.user.name.localeCompare(b.user.name));
        break;
      case 'Last Name':
        filtered.sort((a, b) =>
          a.user.name.split(' ')[1].localeCompare(b.user.name.split(' ')[1]),
        );
        break;
      case 'JHED':
        filtered.sort((a, b) => a.plan.user_id.localeCompare(b.plan.user_id));
        break;
      case 'Graduation Year':
        // TODO
        break;
      default:
    }
    setFiltered(filtered);
  };

  useEffect(() => {
    if (searchState.length > 2) {
      const search = setTimeout(() => filter(), 500);
      return () => clearTimeout(search);
    } else {
      setFiltered(plans);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchState, searchSetting, plans]);

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
          className="h-6 w-6 -ml-6 my-1"
          onClick={() => setDisplaySettings(!displaySettings)}
        />
        {displaySettings ? (
          <div className="absolute -translate-x-full flex flex-col items-start bg-white border shadow rounded p-3">
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
