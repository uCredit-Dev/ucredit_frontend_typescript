import React, { useState, useEffect } from 'react';

function CourseBar(props:any) {
  const mainColor = props.mainColor;
  const subColor = props.subColor;
  const width = window.innerWidth;
  const maxPercentage = props.maxCredits / props.majorCredits;
  const totalWidth =
    props.maxCredits === props.majorCredits
      ? 0.65 * width * maxPercentage
      : width * maxPercentage;
  // States
  const [creditPercentage, setCreditPercentage] = useState(
    props.currentCredits / props.maxCredits
  );
  const [progressWidth, setProgressWidth] = useState(0);

  // On init
  useEffect(() => {
    // console.log('progressWidth', progressWidth);
    // console.log('creditPercentage', creditPercentage);
    if (props.currentCredits / props.maxCredits !== creditPercentage) {
      setCreditPercentage(props.currentCredits / props.maxCredits);
    }
    console.log('creditPercentage', props.section, creditPercentage);
    const tot = (totalWidth - 0.04 * width) * creditPercentage;
    console.log('tot is ', tot, totalWidth - 0.04 * width);
    setProgressWidth(tot);
  }, [props, progressWidth, creditPercentage, totalWidth, width]);

  // State-dependent Styles
  const courseBar = {
    backgroundColor: mainColor,
    transform: 'skewX(-15deg)',
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
    width: totalWidth - width * 0.03,
    height: '3rem',
    borderRadius: '0.5rem',
  } as React.CSSProperties;

  // const titleTab = {
  //   backgroundColor: mainColor,
  //   marginTop: '1rem',
  //   width: '12rem',
  //   height: '1rem',
  //   padding: '0.5rem',
  //   transform: 'perspective(1rem) rotateX(2.5deg)',
  //   marginLeft: '0.675em',
  //   borderTopLeftRadius: '0.5rem',
  //   borderTopRightRadius: '0.5rem',
  //   FontWeight: 'bold',
  // };

  const title = {
    position: 'relative',
    bottom: '4.7rem',
    // left: '2rem',
    FontWeight: 'bold',
  } as React.CSSProperties;

  const totalNum = {
    position: 'relative',
    bottom: '2.25rem',
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'right',
  } as React.CSSProperties;

  const currNum = {
    position: 'relative',
    bottom: '3.5rem',
    left:
      progressWidth - width * 0.03 > 0.03 * width
        ? progressWidth - width * 0.03
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
      {/* <div style={titleTab}></div> */}
      <div style={courseBar}>
        <div style={totalBar}>
          <div style={progressBar}></div>
        </div>
        <div style={totalNum}>{props.maxCredits - props.currentCredits}</div>
      </div>
      <div style={title}>
        {props.section}: {props.maxCredits}
      </div>
      {/* <div style={totalNum}></div> */}
      <div style={currNum}>
        {props.currentCredits !== props.maxCredits
          ? props.currentCredits
          : null}
      </div>
    </div>
  );
}

// Static Styles

export default CourseBar;
