import React, { useEffect } from 'react';
import { UserCourse } from '../../commonTypes';

type popoutType = {
  mainColor: string;
  subColor: string;
  course: UserCourse;
};

function CoursePopout({ mainColor, subColor, course }: popoutType) {
  useEffect(() => {}, [mainColor, subColor, course]);
  const handleChange = (values: any): void => {
    // handles changing distribution
  };

  // const getOptions = (): { label: string; value: string }[] =>
  //   course.areas.split('').map((distr) => {
  //     return { value: distr, label: distr };
  //   });
  return (
    <div
      style={{
        ...popoutBodyStyle,
        backgroundColor: subColor,
        borderColor: mainColor,
        borderRightColor: 'lightgrey',
        borderLeftColor: 'lightgrey',
      }}
    >
      <div style={{ margin: '1rem', fontWeight: 500, fontSize: 'smaller' }}>
        <div style={{ fontWeight: 'bold', fontSize: 'large' }}>
          {course.title}
        </div>
        <div>{course.number}</div>
        <div>Areas: {course.area}</div>
        <div style={{ width: '11rem' }}>
          Tags: {course.tags.length === 0 ? 'none' : course.tags.toString()}
        </div>
        <div>Ratings: </div>
        <div style={{ width: '11rem' }}>
          Selected Distribution:
          <form>
            <select
              value={course.area}
              onChange={handleChange}
              style={{
                backgroundColor: mainColor,
                color: 'white',
                borderRadius: '5rem',
                border: 'none',
                padding: '0.25rem',
              }}
            >
              {course.area.split('').map((distr) => {
                return (
                  <option key={distr} value={distr}>
                    {distr}
                  </option>
                );
              })}
            </select>
          </form>
        </div>
        <div
          style={{
            overflowY: 'scroll',
            height: '13rem',
            fontWeight: 'normal',
            fontSize: 'small',
            width: '16.5rem',
            position: 'absolute',
            right: '0rem',
            top: '1rem',
          }}
        >
          {course.number}
        </div>
      </div>
    </div>
  );
}

const popoutBodyStyle = {
  position: 'absolute',
  top: '33%',
  right: '21rem',
  width: '30rem',
  height: '15rem',
  border: 'solid',
  borderWidth: '0.25rem',
  borderRadius: '1rem',
} as React.CSSProperties;

export default CoursePopout;
