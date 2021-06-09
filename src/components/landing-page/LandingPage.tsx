import React, { useEffect } from "react";
import { useHistory } from "react-router";

/**
 * This is our future landing page!
 */
const LandingPage = () => {
  // Component state setup
  let history = useHistory();
  useEffect(() => {
    history.push("/dashboard");
  });
  return <div></div>;
};

export default LandingPage;
