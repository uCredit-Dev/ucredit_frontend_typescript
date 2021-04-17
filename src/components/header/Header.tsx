import React from "react";
import UserSection from "./UserSection";

function Header() {
  return (
    <>
      <div className='fixed z-30 p-3 medium:px-48 w-full h-header bg-secondary shadow'>
        <UserSection />
      </div>
    </>
  );
}

export default Header;
