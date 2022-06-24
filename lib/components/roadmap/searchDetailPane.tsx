import SearchBar from "./searchBar";

const SearchDetailPane: React.FC = () => {
  return (
    <div className="m-8 px-6 py-4 bg-sky-100 h-96 sticky top-44 rounded-xl">
      <SearchBar iconSize={24} onInputProp={() => {}} 
      placeHolder="Search tags" heightClass="h-10" iconPosition="left-9"/>
    </div>
  );
}
  
export default SearchDetailPane;