import { useState, useEffect, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUser,
  selectPlanList,
  updatePlanList,
} from "../../../slices/userSlice";
import { ReactComponent as RemoveSvg } from "../../../resources/svg/Remove.svg";
import "react-toastify/dist/ReactToastify.css";
import {
  selectPlan,
  updateSelectedPlan,
} from "../../../slices/currentPlanSlice";
import { api } from "../../../resources/assets";
import { toast } from "react-toastify";
import { updateDeletePlanStatus } from "../../../slices/popupSlice";
import ShareLinksPopup from "./ShareLinksPopup";

/**
 * User/Current plan information area.
 */
const InfoCards: FC = () => {
  // Redux Setup
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const currentPlan = useSelector(selectPlan);
  const planList = useSelector(selectPlanList);

  // Holds temporary plan name.
  const [planName, setPlanName] = useState<string>(currentPlan.name);

  // Determines whether we're editing the name.
  const [editName, setEditName] = useState<boolean>(false);

  // shareable URL
  const [shareableURL, setShareableURL] = useState<string>("");

  // Only edits name if editName is true. If true, calls debounce update function
  useEffect(() => {
    if (editName) {
      const update = setTimeout(updateName, 1000);
      return () => clearTimeout(update);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planName]);

  /**
   * Updates temporary plan name and notifies useffect on state change to update db plan name with debounce.
   * @param event
   */
  const handlePlanNameChange = (event: any): void => {
    setPlanName(event.target.value);
    setEditName(true);
  };

  // Updates current plan every time current plan changes
  useEffect((): void => {
    setPlanName(currentPlan.name);
  }, [currentPlan]);

  const updateName = (): void => {
    const body = {
      plan_id: currentPlan._id,
      majors: currentPlan.majors,
      name: planName,
    };
    fetch(api + "/plans/update", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then(() => {
        const newUpdatedPlan = { ...currentPlan, name: planName };
        dispatch(updateSelectedPlan(newUpdatedPlan));
        let newPlanList = [...planList];
        for (let i = 0; i < planList.length; i++) {
          if (newPlanList[i]._id === currentPlan._id) {
            newPlanList[i] = { ...newUpdatedPlan };
          }
        }
        toast.success("Plan name changed to " + planName + "!");
        setEditName(false);
        dispatch(updatePlanList(newPlanList));
      })
      .catch((err) => console.log(err));
  };

  // Activates delete plan popup.
  const activateDeletePlan = (): void => {
    dispatch(updateDeletePlanStatus(true));
  };

  /**
   * Handles when button for shareable link is clicked.
   */
  const onShareClick = (): void => {
    if (shareableURL !== "") {
      setShareableURL("");
      return;
    }
    setShareableURL(
      (window.location.href.includes("localhost")
        ? "localhost:3000"
        : "https://ucredit.me") +
        "/share?_id=" +
        currentPlan._id
    );
  };

  return (
    <div className="tight:items-center mb-4 mx-4 p-6 h-auto bg-white rounded shadow">
      <div className="flex flex-col mb-2 w-auto h-auto">
        <div className="flex flex-row items-end justify-center mb-2 w-full">
          <input
            value={planName}
            className="ml-6 w-plancardinput h-9 text-center text-myplan leading-none border-b hover:border-gray-300 border-transparent focus:outline-none outline-none"
            onChange={handlePlanNameChange}
          />
          <RemoveSvg
            className="ml-1 w-5 h-7 stroke-2 cursor-pointer select-none transform hover:scale-125 transition duration-200 ease-in"
            onClick={activateDeletePlan}
          />
        </div>
      </div>
      <div className="flex flex-col items-center min-w-min">
        <div className="w-auto h-auto text-center">{user.name}</div>
        <div className="w-auto h-auto text-center font-light stroke-2">
          {currentPlan.majors}
        </div>
        <button className="m-auto hover:underline" onClick={onShareClick}>
          Share
        </button>
        <div>
          {shareableURL === "" ? null : (
            <ShareLinksPopup link={shareableURL} setURL={onShareClick} />
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoCards;
