import React, { useState, useEffect } from 'react';
import { getColors } from '../../assets';

type courseBarProps = {
  maxCredits: number;
  majorCredits: number;
  plannedCredits: number;
  currentCredits: number;
  section: string;
};

function CourseBar({
  maxCredits,
  majorCredits,
  plannedCredits,
  currentCredits,
  section,
}: courseBarProps) {
  const width: number = window.innerWidth;
  const maxPercentage: number = maxCredits / majorCredits;
  const totalWidth: number =
    maxCredits === majorCredits
      ? 0.6 * width * maxPercentage
      : width * maxPercentage;

  // States
  const [creditPercentage, setCreditPercentage] = useState<number>(
    currentCredits / maxCredits
  );
  const [
    creditPlannedPercentage,
    setCreditPlannedPercentage,
  ] = useState<number>(plannedCredits / maxCredits);
  const [currentWidth, setCurrentWidth] = useState<number>(0);
  const [plannedWidth, setPlannedWidth] = useState<number>(0);
  const [subColor, setSubColor] = useState<string>('lightblue');
  const [mainColor, setMainColor] = useState<string>('blue');
  const [plannedColor, setPlannedColor] = useState<string>('indigo');

  // On init
  // Changing bar length
  useEffect(() => {
    if (currentCredits / maxCredits !== creditPercentage) {
      setCreditPercentage(currentCredits / maxCredits);
    }
    const currTot = (totalWidth - 0.04 * width) * creditPercentage;
    setCurrentWidth(currTot);

    if (plannedCredits / maxCredits !== creditPlannedPercentage) {
      setCreditPlannedPercentage(plannedCredits / maxCredits);
    }
    const plannedTot = (totalWidth - 0.04 * width) * creditPlannedPercentage;
    setPlannedWidth(plannedTot);
  }, [
    currentCredits,
    plannedCredits,
    maxCredits,
    section,
    currentWidth,
    plannedWidth,
    creditPlannedPercentage,
    creditPercentage,
    totalWidth,
    width,
  ]);

  // Changing color
  useEffect(() => {
    const colors: string[] | undefined = getColors(section);
    if (typeof colors !== 'undefined') {
      setSubColor(colors[1]);
      setMainColor(colors[0]);
      setPlannedColor(colors[2]);
    }
  }, [section, subColor, mainColor]);

  // State-dependent Styles
  const courseBar = {
    width: totalWidth,
    height: '3rem',
    borderRadius: '0.5rem',
    textAlign: 'right',
    fontWeight: 'bold',
    paddingRight: width * 0.015,
    color: 'whitesmoke',
  } as React.CSSProperties;

  const currentBar = {
    backgroundColor: mainColor,
    width: currentWidth,
    height: '3.25rem',
    borderRadius: '0.5rem',
    paddingTop: '0.75rem',
    paddingRight: '5%rem',
  } as React.CSSProperties;

  const plannedBar = {
    backgroundColor: plannedColor,
    width: plannedWidth,
    height: '4rem',
    borderRadius: '0.5rem',
    //paddingTop: '0.75rem',
    paddingRight: '5%rem',
  } as React.CSSProperties;

  const totalBar = {
    backgroundColor: subColor,
    transform: 'skewX(-15deg)',
    width: totalWidth - width * 0.05,
    height: '4rem',
    borderRadius: '0.5rem',
  } as React.CSSProperties;

  const title = {
    position: 'relative',
    bottom: '4.7rem',
    FontWeight: 'bold',
  } as React.CSSProperties;

  const totalNum = {
    position: 'absolute',
    top: '0rem',
    right: '-3.25rem',
    color: 'silver',
    textAlign: 'left',
    width: '7.5rem',
  } as React.CSSProperties;

  // const currNum = {
  //   position: 'relative',
  //   bottom: '3rem',
  //   left:
  //     currentWidth - width * 0.03 > 0.03 * width
  //       ? currentWidth - width * 0.035
  //       : width * 0.0175,
  //   width: '2rem',
  //   color: 'whitesmoke',
  //   fontWeight: 'bold',
  // } as React.CSSProperties;

  const tprStyle = {
    margin: '0rem',
  } as React.CSSProperties;

  // Related Functions

  return (
    <div
      style={{
        height: '7rem',
        marginLeft: '7%',
        marginTop: '1rem',
        float: 'left',
        position: 'relative',
      }}
    >
      <div style={courseBar}>
        <div style={totalBar}>
          <div style={plannedBar}>
            <div style={currentBar}></div>
          </div>
        </div>
      </div>
      <div style={title}>
        {section}: {maxCredits}
      </div>
      {/* <div style={currNum}>
        {currentCredits !== maxCredits ? currentCredits : null}
      </div> */}
      <div style={totalNum}>
        <p style={tprStyle}>{currentCredits} Taken</p>
        <p style={tprStyle}>{plannedCredits} Planned</p>
        <p style={tprStyle}>{maxCredits - currentCredits} Remaining</p>
      </div>
    </div>
  );
}

export default CourseBar;
