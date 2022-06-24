import { useDispatch } from 'react-redux';
import { updateSearchText } from '../../slices/roadmapSearchSlice';
import SearchBar from './searchBar';

const SearchBarArea: React.FC = () => {
  const dispatch = useDispatch();

  const onSearchInput = (evt: any) => {
    dispatch(updateSearchText(evt.target.value));
  }

  return (
    <div className="flex justify-center items-center h-60 bg-white">
      <div className="sticky top-20 w-1/2">
        <SearchBar iconSize={28} onInputProp={onSearchInput} 
        placeHolder="Search" heightClass='h-12' iconPosition='left-3'/>
      </div>
    </div>
  );
}
  
export default SearchBarArea;