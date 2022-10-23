import { FiSearch } from 'react-icons/fi';
import React from 'react';

type SearchBarProps = {
  onInputProp: Function;
  iconSize: number;
  placeHolder: string;
  heightClass: string;
  iconPosition: string;
};

const SearchBar: React.FC<SearchBarProps> = (props) => {
  const onInputChange = (evt: any) => {
    props.onInputProp(evt);
  };

  return (
    <div className="w-full flex justify-center items-center py-2">
      <input
        className={`w-full pl-12 pr-4 rounded-3xl border-solid border-2
      border-gray-600 ${props.heightClass}`}
        type="text"
        placeholder={props.placeHolder}
        onInput={onInputChange}
      />
      <div className={`absolute ${props.iconPosition}`}>
        <FiSearch size={props.iconSize} />
      </div>
    </div>
  );
};

export default SearchBar;
