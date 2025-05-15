import Tube from '@/modules/game/components/tube/tube';
import type { CoordinateTube, TestTubes } from '@/modules/game/interfaces';
import './tubes.css';

interface TubesProps {
  distribution: number[];
  size: number;
  testTubes: TestTubes[];
  handleOnClick: (index: number) => void;
  handlePosition: (index: number, data: CoordinateTube) => void;
}

export default function Tubes({
  distribution,
  size,
  testTubes,
  handleOnClick,
  handlePosition,
}: TubesProps) {
  return (
    <>
      {distribution.map((total: number, row: number) => {
        return (
          <div
            className='game-row-tubes'
            key={row}
            style={{ marginTop: row !== 0 ? size * 1.5 : 'unset' }}
          >
            {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
            {new Array(total).fill(null).map((_, i: number) => {
              const indexBase = distribution
                .slice(0, row)
                .reduce((acc, curr) => acc + curr, 0);
              const { isComplete, index, style, capacity, showConfetti } =
                testTubes[indexBase + i];

              return (
                <Tube
                  key={index}
                  index={index}
                  style={style}
                  isComplete={isComplete}
                  showConfetti={showConfetti}
                  handleOnClick={handleOnClick}
                  handlePosition={(index, coordinates) => {
                    handlePosition(index, { ...coordinates, capacity });
                  }}
                />
              );
            })}
          </div>
        );
      })}
    </>
  );
}
