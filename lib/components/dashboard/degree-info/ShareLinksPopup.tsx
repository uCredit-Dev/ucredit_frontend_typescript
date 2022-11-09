import { FC } from 'react';
import { toast } from 'react-toastify';
import { DuplicateIcon } from '@heroicons/react/outline';
import React from 'react';

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
        toast.info('Copied to Clipboard!', {
          toastId: 'share link copied',
        });
      });
    });
  };

  return (
    <>
      <div className="z-30 w-min" onClick={() => setURL()} />
      <div className="z-40 flex items-center h-6 overflow-auto transform absolute right-0 rounded-md rounded-t-lg w-80 bg-white">
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
