import React from 'react';

const ScheduleGraphic = () => {
  return (
    <>
      {/* coded in schedule */}
      <div className="flex flex-row rounded-t-[30px] bg-[#B1CEFF] w-[94%] h-[13%] gap-4">
        <div className="w-[70%]"></div>
        <div className="rounded-[10px] bg-[#FFFFFF] w-[30px] h-[50%] mt-4"></div>
        <div className="rounded-[10px] bg-[#FFFFFF] w-[30px] h-[50%] mt-4"></div>
        <div className="rounded-[10px] bg-[#FFFFFF] w-[30px] h-[50%] mt-4"></div>
        <div className="w-[5%]"></div>
      </div>

      <div className="flex flex-col rounded-b-[30px] bg-[#FFFFFF] w-[94%] h-[80%] gap-0 pl-[8%] pr-[8%] pb-[3%]">
        <div className="h-[14%]"></div>
        {/* first collapse bar */}
        <div className="h-[60%] flex flex-col gap-2 justify-center ">
          {/* little triangle bar */}
          <div className="h-[10%] flex flex-row gap-4">
            <div
              className="w-0 h-0 
border-t-[7px] border-t-transparent
border-r-[12px] border-r-[#6DACFF]
border-b-[7px] border-b-transparent
-rotate-90 mb-2
"
            ></div>
            <div className="bg-[#D9D9D9] w-[70%] h-[12px] "></div>
            <div className="bg-[#FFE0CB] w-[10px] h-[55%] "></div>
            <div className="bg-[#D1FDCD] w-[10px] h-[55%] "></div>
            <div className="bg-[#83B9FF] w-[10px] h-[55%] "></div>
            <div className="bg-[#FFDBDB] w-[10px] h-[55%] "></div>
            <div className="bg-[#FFF9A3] w-[10px] h-[55%] "></div>
          </div>

          {/* first row of courses */}
          <div className="h-[20%] flex flex-row gap-[3%]">
            <div className="bg-[#E0E7EC] rounded-[5px] w-[22%] h-[30px] flex flex-row pt-[5px] pb-[5px] pl-[4px] ">
              <div className="w-[6px] bg-[#FFE0CB] rounded-[30px]"></div>
              <div className="w-[80%] flex flex-col gap-1 ml-1 mt-[2px] pr-2">
                <div className="h-[6px] w-[110%] bg-[#FFFFFF] rounded-[2px]"></div>
                <div className="h-[6px] w-[85%] bg-[#FFFFFF] rounded-[2px]"></div>
              </div>
            </div>
            <div className="bg-[#E0E7EC] rounded-[5px] w-[22%] h-[30px] flex flex-row pt-[5px] pb-[5px] pl-[4px] ">
              <div className="w-[6px] bg-[#FFF9A3] rounded-[30px]"></div>
              <div className="w-[80%] flex flex-col gap-1 ml-1 mt-[2px] pr-2">
                <div className="h-[6px] w-[110%] bg-[#FFFFFF] rounded-[2px]"></div>
                <div className="h-[6px] w-[85%] bg-[#FFFFFF] rounded-[2px]"></div>
              </div>
            </div>
            <div className="bg-[#E0E7EC] rounded-[5px] w-[22%] h-[30px] flex flex-row pt-[5px] pb-[5px] pl-[4px] ">
              <div className="w-[6px] bg-[#D1FDCD] rounded-[30px]"></div>
              <div className="w-[80%] flex flex-col gap-1 ml-1 mt-[2px] pr-2">
                <div className="h-[6px] w-[110%] bg-[#FFFFFF] rounded-[2px]"></div>
                <div className="h-[6px] w-[85%] bg-[#FFFFFF] rounded-[2px]"></div>
              </div>
            </div>
            <div className="bg-[#E0E7EC] rounded-[5px] w-[22%] h-[30px] flex flex-row pt-[5px] pb-[5px] pl-[4px] ">
              <div className="w-[6px] bg-[#83B9FF] rounded-[30px]"></div>
              <div className="w-[80%] flex flex-col gap-1 ml-1 mt-[2px] pr-2">
                <div className="h-[6px] w-[110%] bg-[#FFFFFF] rounded-[2px]"></div>
                <div className="h-[6px] w-[85%] bg-[#FFFFFF] rounded-[2px]"></div>
              </div>
            </div>
          </div>

          {/* second row of courses */}
          <div className="h-[20%] flex flex-row gap-[3%]">
            <div className="bg-[#E0E7EC] rounded-[5px] w-[22%] h-[30px] flex flex-row pt-[5px] pb-[5px] pl-[4px] ">
              <div className="w-[6px] bg-[#D1FDCD] rounded-[30px]"></div>
              <div className="w-[80%] flex flex-col gap-1 ml-1 mt-[2px] pr-2">
                <div className="h-[6px] w-[110%] bg-[#FFFFFF] rounded-[2px]"></div>
                <div className="h-[6px] w-[85%] bg-[#FFFFFF] rounded-[2px]"></div>
              </div>
            </div>
            <div className="bg-[#E0E7EC] rounded-[5px] w-[22%] h-[30px] flex flex-row pt-[5px] pb-[5px] pl-[4px] ">
              <div className="w-[6px] bg-[#FFF9A3] rounded-[30px]"></div>
              <div className="w-[80%] flex flex-col gap-1 ml-1 mt-[2px] pr-2">
                <div className="h-[6px] w-[110%] bg-[#FFFFFF] rounded-[2px]"></div>
                <div className="h-[6px] w-[85%] bg-[#FFFFFF] rounded-[2px]"></div>
              </div>
            </div>
            <div className="bg-[#E0E7EC] rounded-[5px] w-[22%] h-[30px] flex flex-row pt-[5px] pb-[5px] pl-[4px] ">
              <div className="w-[6px] bg-[#D1FDCD] rounded-[30px]"></div>
              <div className="w-[80%] flex flex-col gap-1 ml-1 mt-[2px] pr-2">
                <div className="h-[6px] w-[110%] bg-[#FFFFFF] rounded-[2px]"></div>
                <div className="h-[6px] w-[85%] bg-[#FFFFFF] rounded-[2px]"></div>
              </div>
            </div>
            <div className="bg-[#E0E7EC] rounded-[5px] w-[22%] h-[30px] flex flex-row pt-[5px] pb-[5px] pl-[4px] ">
              <div className="w-[6px] bg-[#83B9FF] rounded-[30px]"></div>
              <div className="w-[80%] flex flex-col gap-1 ml-1 mt-[2px] pr-2">
                <div className="h-[6px] w-[110%] bg-[#FFFFFF] rounded-[2px]"></div>
                <div className="h-[6px] w-[85%] bg-[#FFFFFF] rounded-[2px]"></div>
              </div>
            </div>
          </div>

          {/* third row of courses */}
          <div className="h-[20%] flex flex-row gap-[3%]">
            <div className="bg-[#E0E7EC] rounded-[5px] w-[22%] h-[30px] flex flex-row pt-[5px] pb-[5px] pl-[4px] ">
              <div className="w-[6px] bg-[#FFE0CB] rounded-[30px]"></div>
              <div className="w-[80%] flex flex-col gap-1 ml-1 mt-[2px] pr-2">
                <div className="h-[6px] w-[110%] bg-[#FFFFFF] rounded-[2px]"></div>
                <div className="h-[6px] w-[85%] bg-[#FFFFFF] rounded-[2px]"></div>
              </div>
            </div>
            <div className="rounded-[5px] w-[22%] h-[30px] flex flex-row pt-[5px] pb-[5px] pl-[4px] "></div>
            <div className="bg-[#E0E7EC] rounded-[5px] w-[22%] h-[30px] flex flex-row pt-[5px] pb-[5px] pl-[4px] ">
              <div className="w-[6px] bg-[#FFE0CB] rounded-[30px]"></div>
              <div className="w-[80%] flex flex-col gap-1 ml-1 mt-[2px] pr-2">
                <div className="h-[6px] w-[110%] bg-[#FFFFFF] rounded-[2px]"></div>
                <div className="h-[6px] w-[85%] bg-[#FFFFFF] rounded-[2px]"></div>
              </div>
            </div>
            <div className="bg-[#E0E7EC] rounded-[5px] w-[22%] h-[30px] flex flex-row pt-[5px] pb-[5px] pl-[4px] ">
              <div className="w-[6px] bg-[#FFE0CB] rounded-[30px]"></div>
              <div className="w-[80%] flex flex-col gap-1 ml-1 mt-[2px] pr-2">
                <div className="h-[6px] w-[110%] bg-[#FFFFFF] rounded-[2px]"></div>
                <div className="h-[6px] w-[85%] bg-[#FFFFFF] rounded-[2px]"></div>
              </div>
            </div>
          </div>

          {/* fourth row of courses */}
          <div className="h-[20%] flex flex-row gap-[3%]">
            <div className="bg-[#E0E7EC] rounded-[5px] w-[22%] h-[30px] flex flex-row pt-[5px] pb-[5px] pl-[4px] ">
              <div className="w-[6px] bg-[#83B9FF] rounded-[30px]"></div>
              <div className="w-[80%] flex flex-col gap-1 ml-1 mt-[2px] pr-2">
                <div className="h-[6px] w-[110%] bg-[#FFFFFF] rounded-[2px]"></div>
                <div className="h-[6px] w-[85%] bg-[#FFFFFF] rounded-[2px]"></div>
              </div>
            </div>
            <div className="rounded-[5px] w-[22%] h-[30px] flex flex-row pt-[5px] pb-[5px] pl-[4px] "></div>
            <div className="bg-[#E0E7EC] rounded-[5px] w-[22%] h-[30px] flex flex-row pt-[5px] pb-[5px] pl-[4px] ">
              <div className="w-[6px] bg-[#FFF9A3] rounded-[30px]"></div>
              <div className="w-[80%] flex flex-col gap-1 ml-1 mt-[2px] pr-2">
                <div className="h-[6px] w-[110%] bg-[#FFFFFF] rounded-[2px]"></div>
                <div className="h-[6px] w-[85%] bg-[#FFFFFF] rounded-[2px]"></div>
              </div>
            </div>
          </div>

          {/* fifth row of courses */}
          <div className="h-[20%] flex flex-row gap-[3%]">
            <div className="w-[22%]"></div>
            <div className="w-[22%]"></div>
            <div className="bg-[#E0E7EC] rounded-[5px] w-[22%] h-[30px] flex flex-row pt-[5px] pb-[5px] pl-[4px] ">
              <div className="w-[6px] bg-[#FFF9A3] rounded-[30px]"></div>
              <div className="w-[80%] flex flex-col gap-1 ml-1 mt-[2px] pr-2">
                <div className="h-[6px] w-[110%] bg-[#FFFFFF] rounded-[2px]"></div>
                <div className="h-[6px] w-[85%] bg-[#FFFFFF] rounded-[2px]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* second collapse bar */}
        <div className="h-[40%]  flex flex-col gap-3 justify-center">
          {/* little triangle bar */}
          <div className="h-[15%] flex flex-row gap-4">
            <div
              className="w-0 h-0 
border-t-[7px] border-t-transparent
border-r-[12px] border-r-[#6DACFF]
border-b-[7px] border-b-transparent
-rotate-90 mb-2
"
            ></div>
            <div className="bg-[#D9D9D9] w-[70%] h-[12px] "></div>
            <div className="bg-[#FFE0CB] w-[10px] h-[70%] "></div>
            <div className="bg-[#D1FDCD] w-[10px] h-[70%] "></div>
            <div className="bg-[#83B9FF] w-[10px] h-[70%] "></div>
            <div className="bg-[#FFDBDB] w-[10px] h-[70%] "></div>
            <div className="bg-[#FFF9A3] w-[10px] h-[70%] "></div>
          </div>

          {/* first row of courses */}
          <div className="h-[20%] flex flex-row">
            <div className="bg-[#E0E7EC] rounded-[5px] w-[22%] h-[30px] flex flex-row pt-[5px] pb-[5px] pl-[4px] ">
              <div className="w-[6px] bg-[#FFE0CB] rounded-[30px]"></div>
              <div className="w-[80%] flex flex-col gap-1 ml-1 mt-[2px] pr-2">
                <div className="h-[6px] w-[110%] bg-[#FFFFFF] rounded-[2px]"></div>
                <div className="h-[6px] w-[85%] bg-[#FFFFFF] rounded-[2px]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScheduleGraphic;
