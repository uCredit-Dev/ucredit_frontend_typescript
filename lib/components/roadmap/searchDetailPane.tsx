import SearchBar from "./searchBar";

const SearchDetailPane: React.FC = () => {
  return (
    <div className="m-8 px-6 py-4 bg-sky-100 sticky top-44 rounded-xl">
      <SearchBar iconSize={24} onInputProp={() => {}} 
      placeHolder="Search tags" heightClass="h-10" iconPosition="left-9"/>
      <div className="w-full my-2 outline outline-gray-600 outline-2
      rounded-2xl overflow-hidden bg-white">
        <input className="w-full h-10 px-3 rounded-t-2xl outline 
        outline-gray-600 outline-2 mb-[2px]"
        type='text' placeholder="search or select major"/>
        <ul className="flex flex-col h-32 overflow-y-scroll rounded-b-2xl
        child:py-2 child:bg-white child:w-full child:text-left child:px-3
        child:outline child:outline-gray-400 child:outline-1 
        hover:child:underline hover:child:bg-gray-200">
          <button>B.S. In Computer Science</button>
          <button>B.A. In Computer Science</button>
          <button>B.S. In Computer Science</button>
          <button>B.A. In Computer Science</button>
          <button>B.S. In Computer Science</button>
          <button>B.A. In Computer Science</button>
          <button>B.S. In Computer Science</button>
          <button>B.A. In Computer Science</button>
        </ul>
      </div>
    </div>
  );
}
  
export default SearchDetailPane;