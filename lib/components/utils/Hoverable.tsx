import clsx from 'clsx';
import { ReactElement, FC, useState, useRef, useEffect } from 'react';

interface Props {
  children({
    hovered,
    clicked,
  }: {
    hovered: boolean;
    clicked: boolean;
  }): string | ReactElement;
  as: ReactElement; // the underlying element
  mode?: 'fixed' | 'hover' | 'click';
}

const Hoverable: FC<Props> = ({ children, as, mode = 'hover' }) => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [mousePos, setMousePos] = useState({
    x: 0,
    y: 0,
  });
  const tooltipRef = useRef(null);
  const [tooltipSize, setTooltipSize] = useState({ height: 0, width: 0 });
  const asRef = useRef(null);
  const [asPos, setAsPos] = useState({ x: 0, y: 0 });
  const [asWidth, setAsWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    // if (!tooltipRef.current) return;
    const height = tooltipRef.current.clientHeight;
    const width = tooltipRef.current.clientWidth;
    setTooltipSize({ height, width });
  }, [mousePos]);

  useEffect(() => {
    const { left, top, width } = asRef.current.getBoundingClientRect();
    setAsPos({ x: left, y: top });
    setAsWidth(width);
  }, [asRef]);

  useEffect(() => {
    if (mode !== 'click') return;
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target)) setClicked(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mode, ref]);

  const handleMouseMove = ({ clientX, clientY }) => {
    setMousePos({ x: clientX, y: clientY });
  };

  const modeHandler = () => {
    switch (mode) {
      case 'fixed':
        return { hovered, clicked: false };
      case 'hover':
        return { hovered, clicked: false };
      case 'click':
        return { hovered: false, clicked };
      default:
    }
  };

  return (
    <div
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      onClick={() => setClicked(true)}
      onMouseMove={handleMouseMove}
      ref={ref}
    >
      <div
        ref={asRef}
        className={clsx('cursor-pointer', {
          'cursor-default': mode !== 'click',
        })}
      >
        {as}
      </div>
      <div
        style={{
          position: 'fixed',
          left:
            mode === 'fixed' || (mode === 'click' && clicked)
              ? asPos.x
              : mousePos.x,
          top:
            mode === 'fixed' || (mode === 'click' && clicked)
              ? asPos.y
              : mousePos.y,
          transform: `translateX(${
            -(tooltipSize.width / 2) +
            (mode === 'fixed' || (mode === 'click' && clicked)
              ? asWidth / 2
              : 0)
          }px) translateY(${-(tooltipSize.height + 4)}px)`,
          zIndex: 100,
        }}
        ref={tooltipRef}
      >
        {children(modeHandler())}
      </div>
    </div>
  );
};

export { Hoverable };
