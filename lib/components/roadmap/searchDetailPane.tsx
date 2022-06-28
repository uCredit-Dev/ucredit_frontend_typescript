import SearchBar from "./searchBar";

const SearchDetailPane: React.FC = () => {
  return (
    <div className="mx-8 my-5 px-6 py-4 bg-sky-100 sticky top-44 rounded-xl">
      <SearchBar iconSize={24} onInputProp={() => {}} 
      placeHolder="Search tags" heightClass="h-10" iconPosition="left-9"/>
      <div className="w-full my-2 outline outline-gray-600 outline-2
      rounded-2xl overflow-hidden bg-white">
        <input className="w-full h-10 px-3 rounded-t-2xl outline 
        outline-gray-600 outline-2 mb-[2px]"
        type='text' placeholder="search or select major"/>
        <ul className="flex flex-col h-40 overflow-y-scroll rounded-b-2xl
        child:py-2 child:bg-white child:w-full child:text-left child:px-3
        child:outline child:outline-gray-400 child:outline-1 
        hover:child:underline hover:child:bg-gray-200">
          <button>B.S. in Computer Science</button>
          <button>B.A. in Computer Science</button>
          <button>B.S. in Electrical Engineering</button>
          <button>B.A. in Mathematics</button>
          <button>B.S. in Public Health</button>
          <button>B.A. in Something Else</button>
          <button>B.S. in Something Else</button>
        </ul>
      </div>
      <p className="relative left-2 mt-4">
        <input type="checkbox" className="mr-2"/>
        My favorites only
      </p>
    </div>
  );
}
  
export default SearchDetailPane;