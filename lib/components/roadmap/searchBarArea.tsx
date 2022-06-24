import { useDispatch } from 'react-redux';
import { RiMapPin2Fill } from 'react-icons/ri';
import { updateSearchText } from '../../slices/roadmapSearchSlice';
import SearchBar from './searchBar';

const SearchBarArea: React.FC = () => {
  const dispatch = useDispatch();

  const onSearchInput = (evt: any) => {
    dispatch(updateSearchText(evt.target.value));
  }

  return (
    <div className="flex flex-col justify-center items-center h-60 bg-white">
      <div className="flex flex-row">
        <RiMapPin2Fill size={36} color="#94B6CC"/>
        <h2 className="text-blue-900 text-4xl pl-2">uCredit Road Map</h2>
      </div>
      <div className="sticky top-20 w-1/2">
        <SearchBar iconSize={28} onInputProp={onSearchInput} 
        placeHolder="Search" heightClass='h-12' iconPosition='left-3'/>
      </div>
    </div>
  );
}
  
export default SearchBarArea;