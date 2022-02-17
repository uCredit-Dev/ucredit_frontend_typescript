import { XIcon } from '@heroicons/react/outline';

/**
 * Feedback notification banner in dashboard
 * @prop actionHandler - handles notification action (ie. clicking on link)
 * @prop notifHandler - handles opening and closing notification popup
 */
const FeedbackNotification: React.FC<{
  actionHandler: (handle: boolean) => void;
  notifHandler: (handle: boolean) => void;
}> = ({ actionHandler, notifHandler }) => {
  return (
    <div className="fixed bottom-0 z-40 flex flex-row w-full py-2 pl-16 font-bold bg-green-500 select-none">
      <div className="flex flex-row flex-grow">
        We use your feedback to improve your planning experience! Please fill
        out{' '}
        <div
          className="ml-1 text-white cursor-pointer"
          onClick={() => actionHandler(true)}
        >
          this feedback form
        </div>
        !
      </div>
      <div className="mr-5 cursor-pointer" onClick={() => notifHandler(false)}>
        <XIcon />
      </div>
    </div>
  );
};

export default FeedbackNotification;
