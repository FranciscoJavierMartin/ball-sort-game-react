import type { CSSProperties } from 'react';
import type { Coordinate } from '@/modules/game/interfaces';

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
  return <div className='tube' style={style}></div>;
}
