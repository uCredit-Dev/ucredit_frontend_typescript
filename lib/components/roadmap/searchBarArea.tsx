import { FiSearch } from 'react-icons/fi';

const SearchBarArea: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-60 bg-white">
      <div className="sticky top-16 w-1/2 flex justify-center items-center">
        <input className="h-12 w-full pl-12 pr-4 rounded-3xl border-2 
        border-solid border-gray-600"
        type="text" placeholder="Search"/>
        {/* This is where the icon goes */}
        {/*<p className="absolute left-2">test</p>*/}
        <FiSearch size="28" className="absolute left-3"/>
      </div>
    </div>
  );
}
  
export default SearchBarArea;