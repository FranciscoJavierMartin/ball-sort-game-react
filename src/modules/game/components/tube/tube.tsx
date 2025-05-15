import { useEffect, useRef, type CSSProperties } from 'react';
import Confetti, { type ConfettiConfig } from 'react-dom-confetti';
import type { Coordinate } from '@/modules/game/interfaces';
import './tube.css';

const config: ConfettiConfig = {
  angle: 90,
  spread: 150,
  startVelocity: 50,
  elementCount: 40,
  dragFriction: 0.3,
  duration: 3000,
  stagger: 1,
  width: '10px',
  height: '10px',
  colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
};

interface TubeProps {
  style: CSSProperties;
  index: number;
  isComplete?: boolean;
  showConfetti?: boolean;
  handleOnClick: (index: number) => void;
  handlePosition: (index: number, data: Coordinate) => void;
}

export default function Tube({
  style,
  index,
  isComplete = false,
  showConfetti = false,
  handleOnClick,
  handlePosition,
}: TubeProps) {
  const ref = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      handlePosition(index, {
        x: ref.current.offsetLeft,
        y: ref.current.offsetTop,
      });
    }
  }, [handlePosition, index]);

  return (
    <button
      ref={ref}
      className='tube'
      style={style}
      onClick={() => handleOnClick(index)}
      aria-label={`Tube ${index}`}
    >
      <Confetti config={config} active={isComplete && showConfetti} />
    </button>
  );
}
