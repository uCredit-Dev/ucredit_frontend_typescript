import { ReactElement, FC, useState, useRef, useEffect } from 'react';

interface Props {
  children({ hovered: boolean }): string | ReactElement;
  as: ReactElement;
}

const Hoverable: FC<Props> = ({ children, as }) => {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({
    x: 0,
    y: 0,
  });
  const tooltipRef = useRef(null);
  const [tooltipSize, setTooltipSize] = useState({ height: 0, width: 0 });

  useEffect(() => {
    if (!tooltipRef) return;
    const height = tooltipRef.current.clientHeight;
    const width = tooltipRef.current.clientWidth;
    setTooltipSize({ height, width });
  }, [mousePos]);

  const handleMouseMove = ({ clientX, clientY }) => {
    setMousePos({ x: clientX, y: clientY });
  };

  return (
    <div
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className="cursor-default"
    >
      {as}
      <div
        style={{
          position: 'fixed',
          left: mousePos.x,
          top: mousePos.y,
          transform: `translateX(${-tooltipSize.width / 2}px) translateY(${-(
            tooltipSize.height + 5
          )}px)`,
        }}
        ref={tooltipRef}
      >
        {children({ hovered })}
      </div>
    </div>
  );
};

export { Hoverable };
