import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

function ProfileMobile(props) {
  return (
    <>
      <div className="justify-center text-center font-landingPage flex box-border border-4 border-[#C6E8FF] h-[212px] w-[145px] px-1 py-4 rounded-[20px] bg-white ">
        <div className=" flex items-center flex-col ">

          <div className="h-[55%] px-1 mt-[-14px] mb-2">
            <img
              className="w-20 h-20 my-4 rounded-[40px] object-cover"
              src={props.img}
              alt="profile"
            />
          </div>

          <div className="text-[16px] font-bold">{props.name}</div>
          <div className="h-[30%] text-[11px]">
            {props.role}           
            {props.class && (
              <p>{`Class of ${props.class}`}</p>
            )}
          </div>
          
          <div className="ml-2 h-[6%] grid grid-cols-3">
            <a href={props.github}>
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.4473 1.61237C6.77578 1.61244 5.15881 2.20728 3.88574 3.29046C2.61266 4.37363 1.76655 5.87447 1.49879 7.52441C1.23103 9.17435 1.55911 10.8657 2.42431 12.2959C3.28951 13.7261 4.63538 14.8018 6.2211 15.3304C6.57307 15.392 6.70506 15.1809 6.70506 14.9961C6.70506 14.8289 6.69626 14.2745 6.69626 13.685C4.9276 14.0105 4.47003 13.2538 4.32924 12.8579C4.17302 12.4727 3.92538 12.1315 3.6077 11.8635C3.36132 11.7315 3.00935 11.406 3.5989 11.3972C3.82401 11.4216 4.03992 11.4999 4.22832 11.6255C4.41673 11.7511 4.57208 11.9203 4.68122 12.1187C4.77749 12.2916 4.90696 12.4439 5.06218 12.5667C5.21741 12.6896 5.39535 12.7806 5.5858 12.8345C5.77626 12.8885 5.97549 12.9043 6.17208 12.8811C6.36867 12.858 6.55875 12.7962 6.73143 12.6994C6.76191 12.3416 6.9214 12.007 7.18021 11.7579C5.61394 11.582 3.97727 10.9748 3.97727 8.28224C3.96738 7.58262 4.22554 6.90573 4.69881 6.39039C4.48361 5.78234 4.50879 5.11505 4.76921 4.52495C4.76921 4.52495 5.35874 4.34015 6.70505 5.24649C7.8569 4.92969 9.07291 4.92969 10.2248 5.24649C11.571 4.33136 12.1606 4.52495 12.1606 4.52495C12.4211 5.11504 12.4462 5.78235 12.231 6.39039C12.7057 6.90485 12.9641 7.58233 12.9525 8.28224C12.9525 10.9836 11.3071 11.582 9.7408 11.7579C9.90879 11.9282 10.0382 12.1327 10.1202 12.3574C10.2022 12.5821 10.2348 12.8218 10.216 13.0602C10.216 14.0018 10.2072 14.7585 10.2072 14.9961C10.2072 15.1809 10.3391 15.4008 10.6911 15.3305C12.274 14.7975 13.616 13.7193 14.4776 12.2884C15.3391 10.8575 15.664 9.16695 15.3944 7.5186C15.1248 5.87026 14.2782 4.37138 13.0057 3.28951C11.7331 2.20765 10.1176 1.61324 8.4473 1.61237Z"
                  fill="#0C3A76"
                />
              </svg>
            </a>
            <a href={props.linkedin}>
              <svg
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.2319 1.43871H3.3071C3.17306 1.43685 3.03996 1.46141 2.91541 1.511C2.79085 1.56058 2.67729 1.63421 2.5812 1.72769C2.4851 1.82117 2.40837 1.93266 2.35537 2.05579C2.30237 2.17893 2.27414 2.3113 2.27231 2.44535V14.5109C2.27414 14.645 2.30237 14.7773 2.35537 14.9005C2.40837 15.0236 2.4851 15.1351 2.5812 15.2286C2.67729 15.322 2.79085 15.3957 2.91541 15.4453C3.03996 15.4948 3.17306 15.5194 3.3071 15.5175H15.2319C15.3659 15.5194 15.499 15.4948 15.6236 15.4453C15.7481 15.3957 15.8617 15.322 15.9578 15.2286C16.0539 15.1351 16.1306 15.0236 16.1836 14.9005C16.2366 14.7773 16.2648 14.645 16.2667 14.5109V2.44535C16.2648 2.3113 16.2366 2.17893 16.1836 2.05579C16.1306 1.93266 16.0539 1.82117 15.9578 1.72769C15.8617 1.63421 15.7481 1.56058 15.6236 1.511C15.499 1.46141 15.3659 1.43685 15.2319 1.43871ZM6.51708 13.2227H4.40525V6.88722H6.51708V13.2227ZM5.46116 6.00025C5.16992 6.00025 4.8906 5.88456 4.68466 5.67861C4.47871 5.47267 4.36302 5.19335 4.36302 4.90211C4.36302 4.61086 4.47871 4.33154 4.68466 4.1256C4.8906 3.91965 5.16992 3.80396 5.46116 3.80396C5.61582 3.78642 5.77243 3.80174 5.92075 3.84893C6.06907 3.89611 6.20575 3.97409 6.32184 4.07776C6.43794 4.18143 6.53082 4.30846 6.59442 4.45051C6.65802 4.59257 6.69089 4.74646 6.69089 4.90211C6.69089 5.05775 6.65802 5.21164 6.59442 5.3537C6.53082 5.49575 6.43794 5.62278 6.32184 5.72645C6.20575 5.83012 6.06907 5.9081 5.92075 5.95528C5.77243 6.00247 5.61582 6.01779 5.46116 6.00025ZM14.1337 13.2227H12.0219V9.82266C12.0219 8.97089 11.7192 8.41477 10.9519 8.41477C10.7144 8.41651 10.4832 8.491 10.2894 8.62819C10.0956 8.76538 9.94843 8.95869 9.86784 9.18207C9.81275 9.34753 9.78888 9.52177 9.79745 9.69595V13.2157H7.68562C7.68562 13.2157 7.68562 7.45741 7.68562 6.88018H9.79745V7.77419C9.98929 7.4413 10.2683 7.16705 10.6045 6.98099C10.9406 6.79492 11.3212 6.70409 11.7051 6.71828C13.113 6.71828 14.1337 7.62636 14.1337 9.57628V13.2227Z"
                  fill="#0C3A76"
                />
              </svg>
            </a>
            <a href={props.portfolio}>
              <svg
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.09169 1.43871C7.72638 1.44131 6.39129 1.84088 5.24903 2.58877C4.10678 3.33666 3.20666 4.40058 2.65833 5.65094C2.10999 6.9013 1.93709 8.28414 2.1607 9.63101C2.38431 10.9779 2.99476 12.2307 3.91772 13.2368C4.57691 13.9513 5.37695 14.5216 6.26743 14.9116C7.15792 15.3016 8.11953 15.503 9.09169 15.503C10.0638 15.503 11.0255 15.3016 11.9159 14.9116C12.8064 14.5216 13.6065 13.9513 14.2657 13.2368C15.1886 12.2307 15.7991 10.9779 16.0227 9.63101C16.2463 8.28414 16.0734 6.9013 15.5251 5.65094C14.9767 4.40058 14.0766 3.33666 12.9343 2.58877C11.7921 1.84088 10.457 1.44131 9.09169 1.43871ZM9.09169 14.1097C7.63345 14.1074 6.23292 13.5397 5.18481 12.5258C5.50303 11.7511 6.04435 11.0886 6.74 10.6223C7.43565 10.156 8.25422 9.90699 9.09169 9.90699C9.92916 9.90699 10.7477 10.156 11.4434 10.6223C12.139 11.0886 12.6804 11.7511 12.9986 12.5258C11.9505 13.5397 10.5499 14.1074 9.09169 14.1097ZM7.68381 7.07025C7.68381 6.79179 7.76638 6.51959 7.92108 6.28807C8.07578 6.05654 8.29566 5.87609 8.55292 5.76953C8.81017 5.66297 9.09325 5.63509 9.36635 5.68942C9.63946 5.74374 9.89032 5.87783 10.0872 6.07472C10.2841 6.27162 10.4182 6.52248 10.4725 6.79558C10.5268 7.06869 10.499 7.35176 10.3924 7.60902C10.2858 7.86628 10.1054 8.08616 9.87387 8.24086C9.64234 8.39556 9.37014 8.47813 9.09169 8.47813C8.7183 8.47813 8.3602 8.3298 8.09617 8.06577C7.83214 7.80174 7.68381 7.44364 7.68381 7.07025ZM13.9559 11.2939C13.327 10.2181 12.359 9.38131 11.2035 8.91457C11.5619 8.50816 11.7955 8.00695 11.8761 7.4711C11.9567 6.93524 11.881 6.3875 11.6581 5.89361C11.4351 5.39971 11.0744 4.98064 10.6192 4.68668C10.164 4.39271 9.63358 4.23635 9.09169 4.23635C8.5498 4.23635 8.01943 4.39271 7.5642 4.68668C7.10898 4.98064 6.74825 5.39971 6.52529 5.89361C6.30234 6.3875 6.22664 6.93524 6.30727 7.4711C6.3879 8.00695 6.62144 8.50816 6.97987 8.91457C5.82441 9.38131 4.8564 10.2181 4.22745 11.2939C3.72621 10.4401 3.46137 9.4682 3.46016 8.47813C3.46016 6.98455 4.05348 5.55215 5.10959 4.49603C6.16571 3.43992 7.59811 2.8466 9.09169 2.8466C10.5853 2.8466 12.0177 3.43992 13.0738 4.49603C14.1299 5.55215 14.7232 6.98455 14.7232 8.47813C14.722 9.4682 14.4572 10.4401 13.9559 11.2939Z"
                  fill="#0C3A76"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileMobile;
