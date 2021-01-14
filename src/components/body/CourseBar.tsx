import React, { useState, useEffect } from 'react';

type courseBarProps = {
  mainColor: string;
  subColor: string;
  maxCredits: number;
  majorCredits: number;
  currentCredits: number;
  section:string;
}

function CourseBar({mainColor, subColor, maxCredits, majorCredits, currentCredits, section}:courseBarProps) {
  const width: number = window.innerWidth;
  const maxPercentage: number = maxCredits / majorCredits;
  const totalWidth: number =
    maxCredits === majorCredits
      ? 0.65 * width * maxPercentage
      : width * maxPercentage;
  
  // States
  const [creditPercentage, setCreditPercentage] = useState<number>(
    currentCredits / maxCredits
  );
  const [progressWidth, setProgressWidth] = useState<number>(0);

  // On init
  useEffect(() => {
    if (currentCredits / maxCredits !== creditPercentage) {
      setCreditPercentage(currentCredits / maxCredits);
    }
    console.log('creditPercentage', section, creditPercentage);
    const tot = (totalWidth - 0.04 * width) * creditPercentage;
    console.log('tot is ', tot, totalWidth - 0.04 * width);
    setProgressWidth(tot);
  }, [currentCredits, maxCredits, section, progressWidth, creditPercentage, totalWidth, width]);

  // State-dependent Styles
  const courseBar = {
    //backgroundColor: mainColor,
    width: totalWidth,
    height: '3rem',
    borderRadius: '0.5rem',
    textAlign: 'right',
    fontWeight: 'bold',
    paddingRight: width * 0.015,
    color: 'whitesmoke',
  } as React.CSSProperties;

  const progressBar = {
    backgroundColor: mainColor,
    width: progressWidth,
    height: '2.25rem',
    borderRadius: '0.5rem',
    paddingTop: '0.75rem',
    paddingRight: '5%rem',
  } as React.CSSProperties;

  const totalBar = {
    backgroundColor: subColor,
    transform: 'skewX(-15deg)',
    width: totalWidth - width * 0.05,
    height: '3rem',
    borderRadius: '0.5rem',
  } as React.CSSProperties;

  const title = {
    position: 'relative',
    bottom: '4.7rem',
    FontWeight: 'bold',
  } as React.CSSProperties;

  const totalNum = {
    position: 'relative',
    bottom: '2.25rem',
    fontWeight: 'bold',
    width: '100%',
    color:'silver',
    textAlign: 'right',
  } as React.CSSProperties;

  const currNum = {
    position: 'relative',
    bottom: '3.5rem',
    left:
      progressWidth - width * 0.03 > 0.03 * width
        ? progressWidth - width * 0.05
        : width * 0.01,
    width: '2rem',
    color: 'whitesmoke',
    fontWeight: 'bold',
  } as React.CSSProperties;

  // Related Functions

  return (
    <div
      style={{
        width: totalWidth,
        height: '6rem',
        marginLeft: '7%',
        marginTop: '1rem',
        float: 'left',
      }}
    >
      <div style={courseBar}>
        <div style={totalBar}>
          <div style={progressBar}></div>
        </div>
        <div style={totalNum}>{maxCredits - currentCredits} Left</div>
      </div>
      <div style={title}>
        {section}: {maxCredits}
      </div>
      <div style={currNum}>
        {currentCredits !== maxCredits
          ? currentCredits
          : null}
      </div>
    </div>
  );
}

export default CourseBar;
