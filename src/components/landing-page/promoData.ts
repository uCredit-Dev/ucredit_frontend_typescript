import UserFriendlyGif from "../../resources/images/landing-page/userFriendly.gif";
import ConvenientGif from "../../resources/images/landing-page/convenient.gif";
import AutomationGif from "../../resources/images/landing-page/automation.gif";
import Trustworthy from "../../resources/images/landing-page/trustworthy.png";

const data = [
  {
    title: "Trustworthy",
    desc: "Courses and degree information are sourced from Johns Hopkins University.",
    img: Trustworthy,
    order: 0,
  },
  {
    title: "Automation",
    desc: "Degree progress and prerequisites checks, all done for you.",
    img: AutomationGif,
    order: 1,
  },
  {
    title: "Convenient",
    desc: "A toolbox of features to ease your academic planning process.",
    img: ConvenientGif,
    order: 0,
  },
  {
    title: "User Friendly",
    desc: "User friendly interface, rigorously researched and tested to optimize your experience.",
    img: UserFriendlyGif,
    order: 1,
  },
];

export default data;
