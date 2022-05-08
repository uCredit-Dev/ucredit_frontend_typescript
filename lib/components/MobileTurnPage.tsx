import { RefreshIcon } from '@heroicons/react/solid';

const MobileTurnPage = () => {
  return (
    <div className="h-screen flex flex-col">
      <RefreshIcon className="w-40 mx-auto mt-auto text-blue-900" />
      <div className="mx-auto w-max mb-auto font-bold text-xl">
        Please flip the screen.
      </div>
    </div>
  );
};

export default MobileTurnPage;
