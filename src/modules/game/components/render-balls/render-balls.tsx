import Ball from '@/modules/game/components/ball/ball';
import type { Balls } from '@/modules/game/interfaces';
import './render-balls.css';

interface RenderBallsProps {
  balls: Balls[];
  size: number;
}

export default function RenderBalls({ balls, size }: RenderBallsProps) {
  return (
    <>
      {balls.map(
        ({ colors, x, y, bounce, incognito, index, animate, positionTube }) => {
          return (
            x &&
            y && (
              <Ball
                key={index}
                x={x}
                y={y}
                size={size}
                animate={animate}
                bounce={bounce}
                incognito={incognito}
                colors={colors}
                index={index}
                positionTube={positionTube}
              />
            )
          );
        },
      )}
    </>
  );
}
