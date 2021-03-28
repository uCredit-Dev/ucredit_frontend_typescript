import React from "react";
import MajorSelect from "./MajorSelect";
import UserSection from "./UserSection";

function Header() {
  return (
    <>
      <div className='h-header bg-secondary fixed z-10 p-3 w-full shadow'>
        <UserSection />
        {/* <MajorSelect /> */}
      </div>
    </>
  );
}

export default Header;
