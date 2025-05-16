import type { CSSProperties } from 'react';
import { SPEED_ANIMATION } from '@/modules/common/constants/size';
import { INCOGNITO_COLOR } from '@/modules/common/constants/color';
import './ball.css';

interface BallProps {
  colors: [string, string];
  size: number;
  x: number;
  y: number;
  animate?: boolean;
  bounce?: boolean;
  incognito?: boolean;
  // TODO: Remove below
  index: number;
  positionTube: number;
}

export default function Ball({
  colors,
  size,
  x,
  y,
  animate = false,
  bounce = false,
  incognito = false,
  index,
  positionTube,
}: BallProps) {
  const style = {
    left: x,
    top: y,
    width: size,
    height: size,
    transition: animate ? `all ${SPEED_ANIMATION}ms ease` : 'unset',
    '--ball-primary': incognito ? INCOGNITO_COLOR : colors[1],
    '--ball-secondary': incognito ? INCOGNITO_COLOR : colors[0],
  } as CSSProperties;

  const className = `ball ${bounce ? 'bounce' : ''} ${incognito ? 'incognito' : ''}`;

  return (
    <div className={className} style={style}>
      {incognito && '?'}
      {/* TODO: Remove */}
      <span
        style={{
          width: '100%',
          height: '100%',
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '12px',
          textShadow: '1px 1px 1px black',
        }}
      >
        {index} - {positionTube}
      </span>
    </div>
  );
}
