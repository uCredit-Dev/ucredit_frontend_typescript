import React from "react";
import UserSection from "./UserSection";

/* 
  Header bar at top of the page.
*/
function Header() {
  return (
    <>
      <div className="fixed z-20 p-3 medium:px-48 w-full h-header bg-primary shadow">
        <UserSection />
      </div>
    </>
  );
}

export default Header;
