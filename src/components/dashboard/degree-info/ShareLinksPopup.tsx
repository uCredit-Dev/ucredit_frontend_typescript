import { FC } from "react";
import { toast } from "react-toastify";
import { ReactComponent as Copy } from "../../../resources/svg/Copy.svg";

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
        toast.info("Copied to Clipboard!", {
          autoClose: 5000,
          closeOnClick: false,
        });
      });
    });
  };

  return (
    <div>
      <div
        className="fixed z-30 left-0 top-0 w-screen h-screen"
        onClick={() => setURL()}
      />
      <div className="absolute z-40 flex items-center w-80 h-6 bg-gray-50 rounded-md rounded-t-lg shadow overflow-auto transform -translate-x-3/4 -translate-y-1/2">
        <div className="flex-grow flex-shrink">
          <form>
            <input
              className="px-1 w-full rounded-md cursor-text"
              type="text"
              name="shareLink"
              value={link}
              disabled={true}
            />
          </form>
        </div>
        <Copy className="w-4 h-4 cursor-pointer" onClick={copyToClipBoard} />
      </div>
    </div>
  );
};

export default ShareLinksPopup;
