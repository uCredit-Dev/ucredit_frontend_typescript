import React, { FC, useState } from "react";
import { ReactComponent as SemesterlySvg } from "../../resources/svg/Semesterly.svg";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import HeadlineImg from "../../resources/images/landing-page/headline.png";
import JoinTeamImg from "../../resources/images/landing-page/joinTeam.png";
import { useHistory } from "react-router";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
emailjs.init("user_7Cn3A3FQW9PTxExf6Npel");

const Banner: FC = () => {
  const [activateEmailPopup, setActivateEmailPopup] = useState<boolean>(false);
  const [year, setYear] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [selfPitch, setSelfPitch] = useState<string>("");
  const [fromEmail, setFromEmail] = useState<string>("");
  const [fromName, setFromName] = useState<string>("");
  const [technologies, setTechnologies] = useState<string>("");
  const [activateError, setActivateError] = useState<boolean>(false);

  const history = useHistory();
  return (
    <>
      {activateEmailPopup ? (
        <div className="absolute top-0">
          {/* Background Grey */}
          <div
            className="fixed z-50 left-0 top-0 m-0 w-full h-screen bg-black opacity-50"
            onClick={() => setActivateEmailPopup(false)}
          ></div>

          {/* Actual popup */}
          <div
            className={
              "  shadow bg-primary z-50 fixed flex flex-col select-none rounded z-20 w-1/2 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 min-w-planAdd shadow"
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
                        onChange={(event) => {
                          setPosition(event.target.value);
                        }}
                      >
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
                      <div className="flex-grow mr-1">
                        Languages and Frameworks:{" "}
                      </div>
                      <input
                        className="p-1 rounded"
                        value={technologies}
                        onChange={(event) =>
                          setTechnologies(event.target.value)
                        }
                      />
                    </div>
                  </div>
                  {activateError ? (
                    <div className="text-red-600">
                      Please fill in all inputs.
                    </div>
                  ) : null}
                  <button
                    className="mt-4 p-2 text-white bg-green-500 rounded"
                    onClick={() => {
                      if (
                        fromName.length > 0 &&
                        fromEmail.length > 0 &&
                        selfPitch.length > 0 &&
                        position.length > 0 &&
                        year.length > 0 &&
                        reason.length > 0 &&
                        technologies.length > 0
                      ) {
                        emailjs.send("service_czbc7ct", "template_cxuebne", {
                          from_name: fromName,
                          from_email: fromEmail,
                          to_email: "mliu78@jh.edu",
                          self_pitch: selfPitch,
                          position: position,
                          year: year,
                          reason: reason,
                          technologies: technologies,
                        });
                        setActivateError(false);
                        setActivateEmailPopup(false);
                        toast.success("Application sent!");
                      } else {
                        setActivateError(true);
                      }
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className={
              "fixed flex flex-col bg-gray-100 rounded z-20 top-1/3 left-1/2 transform -translate-x-1/2 p-5"
            }
          ></div>
        </div>
      ) : null}
      <div className="w-full h-4/6">
        <Carousel showThumbs={false} autoPlay interval={5000} infiniteLoop>
          <div>
            <div className="absolute flex mt-80 w-full">
              <button
                onClick={() => history.push("/login")}
                className="mt-4 mx-auto w-72 h-16 text-white text-3xl font-thin bg-primary rounded-full shadow-xl transform hover:scale-105 transition duration-200 ease-in"
              >
                Get Started
              </button>
            </div>
            <img src={HeadlineImg} alt="" />
          </div>
          <div>
            <div className="absolute flex mt-80 w-full">
              <button
                onClick={() => setActivateEmailPopup(true)}
                className="mt-4 mx-auto w-72 h-16 text-white text-3xl font-thin bg-secondary rounded-full shadow-xl transform hover:scale-105 transition duration-200 ease-in"
              >
                Contact Us
              </button>
            </div>
            <img src={JoinTeamImg} alt="" />
          </div>
        </Carousel>
      </div>
      <div className="flex items-center justify-end mr-2 mt-2 text-gray-600 select-none">
        Partnered with Semesterly
        <SemesterlySvg className="ml-1 w-8 h-8" />
      </div>
      <div
        className="w-full cursor-pointer"
        onClick={() => window.scrollTo(0, 575)}
      >
        <div className="mb-6 mx-auto w-36 text-center font-serif text-lg font-semibold border-b border-theme">
          Why uCredit?
        </div>
      </div>
    </>
  );
};

export default Banner;
