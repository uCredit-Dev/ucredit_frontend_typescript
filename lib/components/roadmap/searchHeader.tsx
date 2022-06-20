import SearchBarArea from "./searchBarArea";

const SearchHeader: React.FC = () => {
  return (
    <div className="sticky -top-48">
      <div className="h-16 bg-red-300 sticky top-0">Navigation</div>
      <SearchBarArea/>
    </div>
  );
}

export default SearchHeader;