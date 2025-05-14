import type { PropsWithChildren } from 'react';
import './game-wrapper.css';

interface GameWrapperProps {
  disableUI?: boolean;
}

export default function GameWrapper({
  children,
  disableUI = false,
}: PropsWithChildren<GameWrapperProps>) {
  return (
    <div className='game-wrapper'>
      {disableUI && <div className='game-wrapper-disabled' />}
      {children}
    </div>
  );
}
