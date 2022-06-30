import SearchBarArea from "./searchBarArea";

const SearchHeader: React.FC = () => {
  return (
    <div className="sticky -top-32 md:-top-36">
      <div className="h-16 bg-sky-200 sticky top-0 flex flex-row justify-center
      items-center text-lg text-blue-900">
        <a href="/">
          <div className="flex flex-row">
            <img className="w-9 h-9 ml-5" src="/img/logo.png" alt="logo" />
            <p className="text-xl flex-grow-0 mx-5 pt-0.5 pb-1">uCredit</p>
          </div>
        </a>
        <p className="flex-grow"></p>
        <a href="/" className="flex-grow-0 mx-2 px-3 pb-0.5 underline
        rounded-3xl hover:bg-blue-900 hover:text-white">
          Dashboard
        </a>
        <a href="/" className="flex-grow-0 mx-2 px-3 pb-0.5 rounded-3xl 
        text-white bg-blue-900">
          Search
        </a>
        <a href="/" className="flex-grow-0 ml-2 mr-5 px-3 pb-0.5 underline
        rounded-3xl hover:bg-blue-900 hover:text-white">
          Post
        </a>
      </div>
      <SearchBarArea/>
    </div>
  );
}

export default SearchHeader;