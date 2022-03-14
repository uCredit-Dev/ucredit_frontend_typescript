interface Props {}

const Search: React.FC<Props> = ({}) => {
  return (
    <input
      className="w-full h-8 px-2 bg-white border border-gray-300 rounded-md outline-none"
      placeholder="Search for a reviewee..."
    />
  );
};

export { Search };
