import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import emailjs from 'emailjs-com';
emailjs.init('user_7Cn3A3FQW9PTxExf6Npel');

/**
 * This is the recruitment application popup from the landing page
 * @prop setActivateEmailPopup - determines whether to display this popup
 */
const ApplicationFormPopup: FC<{
  setActivateEmailPopup: (activate: boolean) => void;
}> = ({ setActivateEmailPopup }) => {
  const [year, setYear] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [position, setPosition] = useState<string>('');
  const [selfPitch, setSelfPitch] = useState<string>('');
  const [fromEmail, setFromEmail] = useState<string>('');
  const [fromName, setFromName] = useState<string>('');
  const [resume, setResume] = useState<string>('');
  const [activateError, setActivateError] = useState<boolean>(false);
  const handleFormEmail = (): void => {
    if (
      fromName.length > 0 &&
      fromEmail.length > 0 &&
      selfPitch.length > 0 &&
      position.length > 0 &&
      year.length > 0 &&
      reason.length > 0 &&
      resume.length > 0
    ) {
      emailjs.send('service_czbc7ct', 'template_cxuebne', {
        from_name: fromName,
        from_email: fromEmail,
        to_email: 'mliu78@jh.edu',
        self_pitch: selfPitch,
        position: position,
        year: year,
        reason: reason,
        resume: resume,
      });
      setActivateError(false);
      setActivateEmailPopup(false);
      toast.success('Application sent!');
    } else {
      setActivateError(true);
    }
  };
  return (
    <div className="absolute top-0">
      {/* Background Grey */}
      <div
        className="fixed z-30 left-0 top-0 m-0 w-full h-screen bg-black opacity-50"
        onClick={() => setActivateEmailPopup(false)}
        data-testid="close-application"
      ></div>

      {/* Actual popup */}
      <div
        className={
          'shadow bg-primary z-40 fixed flex flex-col select-none rounded w-1/2 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 min-w-planAdd shadow'
        }
      >
        <div className="px-4 py-2 text-white text-coursecard font-semibold select-none">
          uCredit Application Form
        </div>
        <div className="w-full h-full text-coursecard">
          <div className="py-4 w-full h-auto bg-gray-200 rounded">
            <div className="flex flex-col items-center justify-center mb-4">
              <b className="flex flex-row mb-8 mt-4 text-center font-semibold">
                Please fill out the required information below.
              </b>
              <div className="px-16 w-full">
                <div className="flex flex-row my-2">
                  <div className="flex-grow mr-1">Name: </div>
                  <input
                    className="p-1 rounded"
                    value={fromName}
                    onChange={(event) => setFromName(event.target.value)}
                  />
                </div>
                <div className="flex flex-row my-2">
                  <div className="flex-grow mr-1">Email: </div>
                  <input
                    className="p-1 rounded"
                    value={fromEmail}
                    onChange={(event) => setFromEmail(event.target.value)}
                  />
                </div>
                <div className="flex flex-row my-2">
                  <div className="flex-grow mr-1">Year: </div>
                  <input
                    className="p-1 rounded"
                    value={year}
                    onChange={(event) => setYear(event.target.value)}
                  />
                </div>
                <div className="flex flex-row my-2">
                  <div className="flex-grow mr-1">Position: </div>
                  <select
                    className="rounded"
                    value={position}
                    onChange={(event) => {
                      setPosition(event.target.value);
                    }}
                  >
                    <option value="">None</option>
                    <option value="SDE">SDE</option>
                    <option value="UX">UX</option>
                  </select>
                </div>
                <div className="flex flex-row my-2">
                  <div className="flex-grow mr-1">Self Pitch: </div>
                  <textarea
                    className="p-1 w-60 rounded"
                    value={selfPitch}
                    onChange={(event) => setSelfPitch(event.target.value)}
                  />
                </div>
                <div className="flex flex-row my-2">
                  <div className="flex-grow mr-1">Reason to join: </div>
                  <textarea
                    className="p-1 w-60 rounded"
                    value={reason}
                    onChange={(event) => setReason(event.target.value)}
                  />
                </div>
                <div className="flex flex-row my-2">
                  <div className="flex-grow mr-1">Resume Link: </div>
                  <input
                    className="p-1 rounded"
                    value={resume}
                    onChange={(event) => setResume(event.target.value)}
                  />
                </div>
              </div>
              {activateError && (
                <div className="text-red-600">*Please fill in all inputs.*</div>
              )}
              <button
                className="mt-4 p-2 text-white bg-primary rounded"
                onClick={handleFormEmail}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          'fixed flex flex-col bg-gray-100 rounded z-20 top-1/3 left-1/2 transform -translate-x-1/2 p-5'
        }
      ></div>
    </div>
  );
};

export default ApplicationFormPopup;
