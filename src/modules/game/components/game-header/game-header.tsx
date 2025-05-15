import type { HeaderActions } from '@/modules/common/constants/header';
import Icon from '@/modules/common/components/icon/icon';
import './game-header.css';

interface HeaderProps {
  level: number;
  isSpecialLevel: boolean;
  totalUndo: number;
  tubeHelpEnabled: boolean;
  handleActions: (type: HeaderActions) => void;
}

export default function GameHeader({
  level,
  isSpecialLevel,
  totalUndo,
  tubeHelpEnabled,
  handleActions,
}: HeaderProps) {
  return (
    <div className='game-header'>
      <a href='#' className='button blue' title='Home'>
        <Icon type='home' />
      </a>
      <button
        className='button blue'
        title='Restart'
        onClick={() => handleActions('RESTART')}
      >
        <Icon type='restart' />
      </button>
      <div className='game-header-level'>
        {!isSpecialLevel ? (
          <>
            <div>Level</div>
            <div>{level}</div>
          </>
        ) : (
          'Special Level'
        )}
      </div>
      <button
        disabled={totalUndo === 0}
        className='button blue'
        title='Undo'
        onClick={() => handleActions('UNDO')}
      >
        <Icon type='undo' />
      </button>
      <button
        disabled={tubeHelpEnabled}
        className='button blue'
        title='Tube'
        onClick={() => handleActions('TUBE')}
      >
        <span>+</span>
        <Icon type='tube' />
      </button>
    </div>
  );
}
