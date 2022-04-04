import { FC } from 'react';
import { toast } from 'react-toastify';
import { DuplicateIcon } from '@heroicons/react/outline';

/**
 * Shareable link popup.
 * @prop link - link is composed of origin + plan id
 * @prop setURL - sets url of shareable link
 */
const ShareLinksPopup: FC<{
  link: string;
  setURL: () => void;
}> = ({ link, setURL }) => {
  const copyToClipBoard = () => {
    navigator.clipboard.writeText(link).then(() => {
      navigator.clipboard.writeText(link).then(() => {
        toast.info('Copied to Clipboard!');
      });
    });
  };

  return (
    <>
      <div
        className="absolute top-0 z-30 w-min h-screen"
        onClick={() => setURL()}
      />
      <div className="absolute z-40 flex items-center h-6 overflow-auto transform -translate-x-full -translate-y-1/2 rounded-md rounded-t-lg w-80 bg-gray-50">
        <div className="flex-grow flex-shrink">
          <form>
            <input
              className="w-full px-1 rounded-md cursor-text"
              type="text"
              name="shareLink"
              value={link}
              disabled={true}
            />
          </form>
        </div>
        <DuplicateIcon
          className="w-4 h-4 cursor-pointer"
          onClick={copyToClipBoard}
        />
      </div>
    </>
  );
};

export default ShareLinksPopup;
