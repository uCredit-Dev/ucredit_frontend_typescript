import React from "react";
import UserSection from "./UserSection";

function Header() {
  return (
    <>
      <div className="fixed z-10 p-3 w-full h-header bg-secondary shadow">
        <UserSection />
      </div>
    </>
  );
}

export default Header;
